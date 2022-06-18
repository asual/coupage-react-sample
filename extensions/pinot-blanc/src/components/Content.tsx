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

import { Box, Paper, Typography, useTheme } from "@mui/material";
import { PageNotFound } from "common/components";
import { PAGE_NOT_FOUND_PATH } from "common/constants";
import { Fragment, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { Navigate, Route, Routes } from "react-router-dom";
import { VictoryBar } from "victory-bar";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";

export default function Content() {
    const theme = useTheme();
    const chartData = useMemo(
        () =>
            [...Array(6)].map(() => [
                {
                    x: new Date(1970, 1, 1),
                    y: Math.ceil(Math.random() * 5),
                },
                {
                    x: new Date(1980, 1, 1),
                    y: Math.ceil(Math.random() * 5),
                },
                {
                    x: new Date(1990, 1, 1),
                    y: Math.ceil(Math.random() * 10),
                },
                {
                    x: new Date(2000, 1, 1),
                    y: 5 + Math.ceil(Math.random() * 5),
                },
                {
                    x: new Date(2010, 1, 1),
                    y: 5 + Math.ceil(Math.random() * 5),
                },
                {
                    x: new Date(2020, 1, 1),
                    y: 5 + Math.ceil(Math.random() * 10),
                },
            ]),
        []
    );
    const chartScale = ["#007463", "#008456", "#009447", "#2CA335", "#6EB01F", "#A3BA00"];
    const chartTheme = {
        axis: {
            style: {
                axis: {
                    stroke: theme.palette.text.primary,
                },
                grid: {
                    stroke: theme.palette.text.secondary,
                    strokeDasharray: "5",
                },
                tickLabels: {
                    color: "red",
                    fill: theme.palette.text.primary,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: parseInt(theme.spacing(1.5)),
                    padding: parseInt(theme.spacing(2), 10),
                    textAnchor: "middle",
                },
            },
        },
        bar: {
            style: {
                data: {
                    width: parseInt(theme.spacing(4), 10),
                },
            },
        },
    };

    return (
        <Routes>
            <Route
                element={
                    <Fragment>
                        <Typography variant="h1">
                            <FormattedMessage defaultMessage="Pinot Blanc" id="pinotBlanc.title" />
                        </Typography>
                        <Box
                            sx={{
                                height: 500,
                                width: {
                                    sm: 500,
                                    xs: "100%",
                                },
                            }}
                        >
                            <Paper>
                                <VictoryChart
                                    domain={{ x: [new Date(1964, 11, 31), new Date(2025, 1, 0)], y: [0, 100.1] }}
                                    height={425}
                                    theme={chartTheme}
                                    width={425}
                                >
                                    <VictoryStack colorScale={chartScale}>
                                        {chartData.map((data, i) => (
                                            <VictoryBar data={data} key={i} />
                                        ))}
                                    </VictoryStack>
                                </VictoryChart>
                            </Paper>
                        </Box>
                    </Fragment>
                }
                path="/pinot-blanc"
            />
            <Route
                element={
                    <Fragment>
                        <Typography variant="h1">
                            <FormattedMessage defaultMessage="Pinot Blanc" id="pinotBlanc.title" />
                        </Typography>
                        <Box
                            sx={{
                                height: 500,
                                width: {
                                    sm: 500,
                                    xs: "100%",
                                },
                            }}
                        >
                            <Paper>
                                <VictoryChart
                                    domain={{ x: [new Date(1964, 11, 31), new Date(2025, 1, 0)], y: [0, 100.1] }}
                                    height={425}
                                    theme={chartTheme}
                                    width={425}
                                >
                                    <VictoryStack colorScale={chartScale.slice(3)}>
                                        {chartData.slice(0, 3).map((data, i) => (
                                            <VictoryBar data={data} key={i} />
                                        ))}
                                    </VictoryStack>
                                </VictoryChart>
                            </Paper>
                        </Box>
                    </Fragment>
                }
                path="/pinot-blanc/top"
            />
            <Route element={<PageNotFound />} path={PAGE_NOT_FOUND_PATH} />
            <Route path="*" element={<Navigate to={PAGE_NOT_FOUND_PATH} replace />} />
        </Routes>
    );
}
