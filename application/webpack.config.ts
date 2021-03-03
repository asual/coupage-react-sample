/*
 * Copyright (c) 2020-2021 Rostislav Hristov
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
import { existsSync, readFileSync } from "fs";
import { basename, join, resolve } from "path";

import CopyWebpackPlugin from "copy-webpack-plugin";
import GenerateJsonWebpackPlugin from "generate-json-webpack-plugin";
import { sync } from "glob";
import { EnvironmentPlugin, WebpackPluginInstance } from "webpack";

const interpolateName = (path: string) => {
    const hash = createHash("md4").update(readFileSync(path)).digest("hex").substr(0, 8);
    return basename(path).replace(".", "." + hash + ".");
};
const findFile = (path: string, file: string): string => {
    if (existsSync(join(path, file))) {
        return join(path, file);
    }
    return findFile(join(path, ".."), file);
};
const readFile = (path: string) => JSON.parse(readFileSync(path).toString());
const cleanPath = (path: string) => path.replace(/(\.\.|dist)\//g, "");

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
    const name = readFile(findFile(resolve(__dirname, val), "package.json")).name;
    const resourceFolder = basename(join(val, ".."));
    const resourceName = basename(val).split(".")[0];
    return {
        ...acc,
        [name]: {
            ...acc[name],
            [resourceFolder]: {
                ...(acc[name] && acc[name][resourceFolder]),
                [resourceName]: join("/", cleanPath(val)),
            },
        },
    };
}, {});

export default {
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
