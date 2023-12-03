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

import { preloadResources } from "@coupage/core";

import { createLoadingElement } from "loading";

const commonIntlMap = Object.fromEntries(process.env.COMMON_INTL_MAP as Iterable<[]>) as Record<string, string>;
const intlMap = Object.fromEntries(process.env.INTL_MAP as Iterable<[]>) as Record<string, string>;
const language = navigator.languages.find((val) => Object.keys(intlMap).includes(val)) || "en";
const locale = navigator.languages.find((val) => val.startsWith(language)) || "en";
const nonce = document.querySelector('meta[name="nonce"]')?.getAttribute("content")?.toString();

if (nonce) {
    __webpack_nonce__ = nonce;
}

const container = document.querySelector(".application");
if (container) {
    const timeout = setTimeout(() => {
        createLoadingElement(container, nonce);
    }, 250);
    fetch("/resources.json")
        .then((data) => data.json())
        .then((resources) =>
            Promise.all([
                import(/* webpackChunkName: "bootstrap" */ "bootstrap"),
                fetch(commonIntlMap[language]).then((data) => data.json()),
                fetch(intlMap[language]).then((data) => data.json()),
                preloadResources(resources, language, nonce),
            ]).then(([{ createApplication }, commonMessages, messages]) => {
                clearTimeout(timeout);
                createApplication({
                    container,
                    language,
                    locale,
                    messages: {
                        ...commonMessages,
                        ...messages,
                    },
                    nonce,
                    resources,
                });
            })
        );
}

if (process.env.NODE_ENV === "production") {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("/sw.js");
        });
    }
}
