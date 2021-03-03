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

import { preloadResources } from "@coupage/core";
import { createElement, Fragment, ReactElement, StrictMode, useEffect, useState } from "react";
import { render } from "react-dom";

import { createLoadingElement } from "loading";
import { pluralRules, relativeTimeFormat } from "polyfills";

const commonIntlMap = Object.fromEntries(process.env.COMMON_INTL_MAP as Iterable<[]>) as Record<string, string>;
const intlMap = Object.fromEntries(process.env.INTL_MAP as Iterable<[]>) as Record<string, string>;
const locale =
    navigator.languages
        .flatMap((val) => [...new Set([val, val.split("-")[0]])])
        .find((val) => Object.keys(intlMap).includes(val)) || "en";
const nonce = document.querySelector('meta[property="csp-nonce"]')?.getAttribute("content")?.toString();

if (nonce) {
    __webpack_nonce__ = nonce;
}

render(
    <StrictMode>
        {createElement(() => {
            const [applicationElement, setApplicationElement] = useState<ReactElement | null>(null);
            const [loadingElement, setLoadingElement] = useState<ReactElement | null>(null);
            useEffect(() => {
                const timeout = setTimeout(() => {
                    setLoadingElement(createLoadingElement(nonce));
                }, 250);
                fetch("/resources.json")
                    .then((data) => data.json())
                    .then((resources) =>
                        Promise.all([
                            import(/* webpackChunkName: "application" */ "components/Application"),
                            fetch(commonIntlMap[locale]).then((data) => data.json()),
                            fetch(intlMap[locale]).then((data) => data.json()),
                            preloadResources(resources, locale),
                            pluralRules(locale),
                            relativeTimeFormat(locale),
                        ]).then(([application, commonMessages, messages]) => {
                            clearTimeout(timeout);
                            setApplicationElement(
                                createElement(application.default, {
                                    locale,
                                    messages: {
                                        ...commonMessages,
                                        ...messages,
                                    },
                                    nonce,
                                    resources,
                                })
                            );
                        })
                    );
                return () => {
                    clearTimeout(timeout);
                };
            }, []);
            return applicationElement || loadingElement || <Fragment />;
        })}
    </StrictMode>,
    document.querySelector(".application")
);

if (process.env.NODE_ENV === "production") {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("/sw.js");
        });
    }
}
