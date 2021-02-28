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

const createSpinnerElement = () => {
    const style = document.createElement("style");
    if (nonce) {
        style.setAttribute("nonce", nonce);
    }
    style.textContent = `
        @keyframes circular-dash {
            0% {
                stroke-dasharray: 1px, 200px;
                stroke-dashoffset: 0px;
            }
            50% {
                stroke-dasharray: 100px, 200px;
                stroke-dashoffset: -15px;
            }
            100% {
                stroke-dasharray: 100px, 200px;
                stroke-dashoffset: -125px;
            }
        } 
        @keyframes rotate {
            0% {
                transform-origin: 50% 50%;
            }
            100% {
                transform: rotate(360deg);
            }
        }
        .spinner {
            animation: rotate 1.4s linear infinite;
            color: #3f51b5;
            display: inline-block;
            height: 40px;
            width: 40px;
        }
        .spinner-container {
            display: flex;
            position: absolute;
            padding: 12px;
            z-index: 9999;
        }
        .spinner-content {
            animation: circular-dash 1.4s ease-in-out infinite;
            stroke: currentColor;
            strokeDasharray: 80px, 200px;
            strokeDashoffset: 0;
        }
    `;
    document.head.appendChild(style);
    return (
        <div className="spinner-container">
            <div className="spinner">
                <svg viewBox="22 22 44 44">
                    <circle className="spinner-content" cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6"></circle>
                </svg>
            </div>
        </div>
    );
};

render(
    <StrictMode>
        {createElement(() => {
            const [applicationElement, setApplicationElement] = useState<ReactElement | null>(null);
            const [spinnerElement, setSpinnerElement] = useState<ReactElement | null>(null);
            useEffect(() => {
                const timeout = setTimeout(() => {
                    setSpinnerElement(createSpinnerElement());
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
            return applicationElement || spinnerElement || <Fragment />;
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
