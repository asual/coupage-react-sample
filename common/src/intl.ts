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

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { EOL } from "os";
import { resolve } from "path";

import { sync } from "glob";
import tri, { Message } from "typescript-react-intl";

function sort(a: Message, b: Message): number {
    if (a.id === b.id) {
        return 0;
    }
    if (a.id.charAt(0) === b.id.charAt(0)) {
        if (a.id.length === 1) {
            return -1;
        }
        if (b.id.length === 1) {
            return 1;
        }
        return sort(
            {
                ...a,
                id: a.id.slice(1),
            },
            {
                ...b,
                id: b.id.slice(1),
            }
        );
    }
    if (a.id.charCodeAt(0) < b.id.charCodeAt(0)) {
        return -1;
    }
    if (a.id.charCodeAt(0) > b.id.charCodeAt(0)) {
        return 1;
    }
    return 0;
}

export function intl() {
    const value = sync("src/**/!(*.test).{ts,tsx}")
        .reduce((acc: Message[], val) => [...acc, ...tri(readFileSync(val).toString())], [])
        .sort(sort)
        .reduce((acc, val) => ({ ...acc, [val.id]: val.defaultMessage }), {});

    const outDir = "intl";
    if (!existsSync(outDir)) {
        mkdirSync(outDir);
    }
    writeFileSync(resolve(outDir, "en.json"), JSON.stringify(value, null, 4) + EOL);
}
