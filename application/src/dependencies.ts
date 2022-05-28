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

export const dependencies = {
    "@coupage/core": require("@coupage/core"),
    "@coupage/react": require("@coupage/react"),
    "@emotion/react": require("@emotion/react"),
    "@emotion/styled": require("@emotion/styled"),
    "@mui/material": require("@mui/material"),
    "@mui/material/utils": require("@mui/material/utils"),
    common: require("common"),
    "common/components": require("common/components"),
    "common/constants": require("common/constants"),
    react: require("react"),
    "react-intl": require("react-intl"),
    "react-router-dom": require("react-router-dom"),
    "react/jsx-runtime": require("react/jsx-runtime"),
    tslib: require("tslib"),
} as Record<string, unknown>;
