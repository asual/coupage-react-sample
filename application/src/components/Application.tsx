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

import { ExtensionResources } from "@coupage/core";
import { ExtensionProvider } from "@coupage/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { StrictMode, useMemo } from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";

import ApplicationContainer from "components/ApplicationContainer";
import ApplicationTitle from "components/ApplicationTitle";
import { dependencies } from "dependencies";

interface ApplicationProps {
    language?: string;
    locale: string;
    messages: Record<string, string>;
    nonce?: string;
    resources: Record<string, ExtensionResources>;
}

export default function Application({ language, locale, messages, nonce, resources }: ApplicationProps) {
    const cache = useMemo(
        () =>
            createCache({
                key: "coupage",
                nonce,
            }),
        [nonce]
    );
    return (
        <StrictMode>
            <BrowserRouter>
                <IntlProvider defaultLocale="en" locale={locale} messages={messages}>
                    <CacheProvider value={cache}>
                        <ExtensionProvider
                            dependencies={dependencies}
                            language={language}
                            nonce={nonce}
                            resources={resources}
                        >
                            <ApplicationTitle />
                            <ApplicationContainer />
                        </ExtensionProvider>
                    </CacheProvider>
                </IntlProvider>
            </BrowserRouter>
        </StrictMode>
    );
}
