/*
 * Copyright (c) 2020-2022 Rostislav Hristov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { createHash } from "crypto";
import { readFileSync } from "fs";
import { basename, dirname, join, resolve } from "path";

import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import GenerateJsonWebpackPlugin from "generate-json-webpack-plugin";
import { sync } from "glob";
import { Configuration, EnvironmentPlugin, WebpackPluginInstance } from "webpack";
import { merge } from "webpack-merge";

function interpolateName(path: string) {
    const hash = createHash("sha256").update(readFileSync(path)).digest("hex").substring(0, 8);
    return basename(path).replace(".", "." + hash + ".");
}

function readJsonFile(path: string) {
    return JSON.parse(readFileSync(path, "utf-8"));
}

function cleanPath(path: string) {
    return path.replace(/(\.\.|dist)\//g, "").replace(/^\//, "");
}

const commonIntlMap = sync("node_modules/common/intl/*.*", {
    cwd: __dirname,
}).reduce<Record<string, string>>(
    (acc, val) => ({
        ...acc,
        [basename(val, ".json")]: val,
    }),
    {}
);

const extensionResources = sync("../extensions/*/dist/*/*.*", {
    cwd: __dirname,
});

const resources = extensionResources.reduce((acc: Record<string, Record<string, Record<string, unknown>>>, val) => {
    const extensionName = readJsonFile(resolve(join(dirname(val), "../../package.json"))).name;
    const resourceFolder = basename(join(val, ".."));
    const resourceName = basename(val).split(".")[0];
    return {
        ...acc,
        [extensionName]: {
            ...acc[extensionName],
            [resourceFolder]: {
                ...(acc[extensionName] && acc[extensionName][resourceFolder]),
                [resourceName]: join("/", cleanPath(val)),
            },
        },
    };
}, {});

const commonConfiguration: Configuration = {
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                ...extensionResources.map((resource) => ({
                    from: resource,
                    to: cleanPath(resource),
                })),
                ...Object.values(commonIntlMap).map((intl) => ({
                    from: intl,
                    to: join("common", "messages", interpolateName(intl)),
                })),
            ],
        }),
        new EnvironmentPlugin({
            COMMON_INTL_MAP: Object.entries(
                Object.keys(commonIntlMap).reduce(
                    (acc, val) => ({
                        ...acc,
                        [val]: join("/", "common", "messages", interpolateName(commonIntlMap[val])),
                    }),
                    {}
                )
            ),
        }),
        new GenerateJsonWebpackPlugin("resources.json", resources) as WebpackPluginInstance,
    ],
};

const developmentConfiguration: Configuration = {
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "swc-loader",
                        options: {
                            inlineSourcesContent: true,
                            jsc: {
                                parser: {
                                    syntax: "typescript",
                                    tsx: true,
                                },
                                transform: {
                                    react: {
                                        development: true,
                                        refresh: true,
                                        runtime: "automatic",
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new ReactRefreshWebpackPlugin()],
};

const isDevelopment = process.env.NODE_ENV === "development";

export default merge(commonConfiguration, isDevelopment ? developmentConfiguration : {});
