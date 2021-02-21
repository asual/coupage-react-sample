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

import { ExtensionPoint } from "@coupage/react";
import { Box, Container, CssBaseline, Grid, IconButton, ThemeProvider, Typography } from "@material-ui/core";
import { makeStyles, unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import { extensionDefinitionTemplate, extensionPointNames, PageNotFound, PAGE_NOT_FOUND_PATH } from "common";
import { createElement, Fragment, useState } from "react";
import { defineMessages, FormattedMessage, useIntl } from "react-intl";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";

import DocumentTitle from "components/Document";
import Navigation from "components/Navigation";
import { darkTheme, lightTheme } from "theme";

const { switchTheme } = defineMessages({
    switchTheme: {
        defaultMessage: "Switch theme",
        id: "application.switchTheme",
    },
});

const useStyles = makeStyles((theme) => ({
    content: {
        margin: 0,
    },
    subtitle: {
        marginBottom: theme.spacing(3),
    },
    theme: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
    title: {
        fontSize: 48,
    },
}));

export default function Content() {
    const classes = useStyles();
    const intl = useIntl();
    const location = useLocation();
    const [theme, setTheme] = useState(lightTheme);

    return (
        <ThemeProvider theme={createMuiTheme({ ...theme })}>
            <CssBaseline />
            <DocumentTitle />
            <IconButton
                aria-label={intl.formatMessage(switchTheme)}
                className={classes.theme}
                onClick={() => {
                    setTheme(theme === lightTheme ? darkTheme : lightTheme);
                }}
            >
                {theme === lightTheme ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
            <Box display="flex">
                <Navigation />
                <Container className={classes.content}>
                    <ExtensionPoint
                        fallback={
                            <Switch>
                                <Route exact path="/">
                                    <Typography className={classes.title} variant="h1">
                                        <FormattedMessage defaultMessage="Coupage Showcase" id="application.title" />
                                    </Typography>
                                    <Typography className={classes.subtitle} variant="body1">
                                        <FormattedMessage
                                            defaultMessage="<strong>Coupage (/ku.paʒ/)</strong> is a tiny toolkit that aims to simplify the creation of extensible browser-based applications. It implements a mechanism for loading extensions inside an application host and takes care of shared dependencies."
                                            id="application.subtitle"
                                            values={{
                                                strong: function Strong(...chunks: string[]) {
                                                    return <strong>{chunks}</strong>;
                                                },
                                            }}
                                        />
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <ExtensionPoint fallback={<Fragment />} name={extensionPointNames.widget}>
                                            {({ component }: typeof extensionDefinitionTemplate.content) => (
                                                <Grid item sm={12} md={6} lg={4}>
                                                    {createElement(component)}
                                                </Grid>
                                            )}
                                        </ExtensionPoint>
                                    </Grid>
                                </Route>
                                <Route exact path={PAGE_NOT_FOUND_PATH}>
                                    <PageNotFound />
                                </Route>
                                <Redirect to={PAGE_NOT_FOUND_PATH} />
                            </Switch>
                        }
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
