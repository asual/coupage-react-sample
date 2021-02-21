/*
 * Copyright (c) 2020 Rostislav Hristov
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

import { Resources } from "@coupage/core";
import { ExtensionProvider } from "@coupage/react";
import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";

import Content from "components/Content";

const dependencies = {
    "@coupage/core": require("@coupage/core"),
    "@coupage/react": require("@coupage/react"),
    "@material-ui/core": require("@material-ui/core"),
    "@material-ui/core/styles": require("@material-ui/core/styles"),
    "@material-ui/core/utils": require("@material-ui/core/utils"),
    common: require("common"),
    react: require("react"),
    "react-intl": require("react-intl"),
    "react-router-dom": require("react-router-dom"),
    tslib: require("tslib"),
} as Record<string, unknown>;

interface ApplicationProps {
    locale: string;
    messages: Record<string, string>;
    nonce?: string;
    resources: Resources;
}

export default function Application({ locale, messages, nonce, resources }: ApplicationProps) {
    return (
        <IntlProvider defaultLocale="en" locale={locale} messages={messages}>
            <BrowserRouter>
                <ExtensionProvider dependencies={dependencies} nonce={nonce} resources={resources}>
                    <Content />
                </ExtensionProvider>
            </BrowserRouter>
        </IntlProvider>
    );
}
