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

import { ExtensionPoint } from "@coupage/react";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Box, Container, createTheme, GlobalStyles, IconButton, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { extensionDefinitionTemplate, extensionPointNames } from "common";
import { createElement, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

import ApplicationContent from "components/ApplicationContent";
import ApplicationNavigation from "components/ApplicationNavigation";
import { dark, light } from "theme";

export default function ApplicationContainer() {
    const intl = useIntl();
    const location = useLocation();
    const [theme, setTheme] = useState(localStorage.getItem("theme") === "dark" ? dark : light);

    useEffect(() => {
        localStorage.setItem("theme", theme === light ? "light" : "dark");
    }, [theme]);

    return (
        <ThemeProvider theme={createTheme({ ...theme })}>
            <CssBaseline />
            <GlobalStyles styles={{ body: { minHeight: "100%" }, html: { height: "100%" } }} />
            <IconButton
                aria-label={intl.formatMessage(
                    (<FormattedMessage defaultMessage="Switch theme" id="application.switchTheme" />).props
                )}
                onClick={() => {
                    setTheme(theme === light ? dark : light);
                }}
                sx={{
                    position: "absolute",
                    right: theme.spacing(2),
                    top: theme.spacing(1),
                }}
            >
                {theme === light ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <ApplicationNavigation />
                <Container
                    sx={{
                        margin: theme.spacing(0, 0, 2),
                    }}
                >
                    <ExtensionPoint
                        fallback={<ApplicationContent />}
                        filter={({ path }) => location.pathname.startsWith(path)}
                        name={extensionPointNames.content}
                    >
                        {({ component }: typeof extensionDefinitionTemplate.content) => createElement(component)}
                    </ExtensionPoint>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
