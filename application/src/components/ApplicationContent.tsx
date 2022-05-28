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
import { Sort } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { extensionDefinitionTemplate, extensionPointNames } from "common";
import { PageNotFound } from "common/components";
import { PAGE_NOT_FOUND_PATH } from "common/constants";
import { createElement, Fragment, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Navigate, Route, Routes } from "react-router-dom";

export default function ApplicationContent() {
    const intl = useIntl();
    const theme = useTheme();
    const [sort, setSort] = useState(true);

    return (
        <Routes>
            <Route
                element={
                    <Fragment>
                        <Typography
                            sx={{
                                fontSize: theme.spacing(6),
                            }}
                            variant="h1"
                        >
                            <FormattedMessage defaultMessage="Coupage Showcase" id="application.title" />
                        </Typography>
                        <Typography variant="body1">
                            <FormattedMessage
                                defaultMessage="<strong>Coupage (/ku.paʒ/)</strong> is a tiny toolkit that aims to simplify the creation of extensible browser-based applications. It implements a mechanism for loading extensions inside an application host and takes care of shared dependencies."
                                id="application.description"
                                values={{
                                    strong: (...parts) => <strong>{parts}</strong>,
                                }}
                            />
                        </Typography>
                        <Box sx={{ padding: theme.spacing(1, 0) }}>
                            <Typography align="right" variant="body1">
                                <FormattedMessage defaultMessage="Sort:" id="application.sort" />
                                <IconButton
                                    aria-label={intl.formatMessage(
                                        (<FormattedMessage defaultMessage="Sort:" id="application.sort" />).props
                                    )}
                                    onClick={() => {
                                        setSort(!sort);
                                    }}
                                    sx={{
                                        margin: theme.spacing(0, 0.5),
                                        ...(!sort && { transform: "scaleY(-1)" }),
                                    }}
                                >
                                    <Sort />
                                </IconButton>
                            </Typography>
                        </Box>
                        <Grid container spacing={2}>
                            <ExtensionPoint
                                fallback={<Fragment />}
                                name={extensionPointNames.card}
                                sort={(a, b) => (sort ? b.data - a.data : a.data - b.data)}
                            >
                                {({ component }: typeof extensionDefinitionTemplate.card) => (
                                    <Grid item sm={12} md={6} lg={4}>
                                        {createElement(component)}
                                    </Grid>
                                )}
                            </ExtensionPoint>
                        </Grid>
                    </Fragment>
                }
                path="/"
            />
            <Route element={<PageNotFound />} path={PAGE_NOT_FOUND_PATH} />
            <Route path="*" element={<Navigate to={PAGE_NOT_FOUND_PATH} replace />} />
        </Routes>
    );
}
