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

import { Box, Paper, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { PAGE_NOT_FOUND_PATH } from "common";
import { FormattedMessage } from "react-intl";
import { Redirect, Route, Switch } from "react-router-dom";
import { VictoryBar } from "victory-bar";
import { VictoryChart } from "victory-chart";
import { VictoryStack } from "victory-stack";

export default function Content() {
    const theme = useTheme();
    const chartData = [...Array(6)].map(() => [
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
    ]);
    const chartScale = ["#007463", "#008456", "#009447", "#2CA335", "#6EB01F", "#A3BA00"];
    const chartTheme = {
        axis: {
            style: {
                axis: {
                    stroke: theme.palette.text.primary,
                },
                grid: {
                    stroke: theme.palette.text.hint,
                    strokeDasharray: "5",
                },
                tickLabels: {
                    color: "red",
                    fill: theme.palette.text.primary,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: theme.typography.body2.fontSize,
                    padding: theme.spacing(2),
                    textAnchor: "middle",
                },
            },
        },
        bar: {
            style: {
                data: {
                    width: theme.spacing(4),
                },
            },
        },
    };

    return (
        <Switch>
            <Route exact path="/pinot-blanc">
                <Typography variant="h1">
                    <FormattedMessage defaultMessage="Pinot Blanc" id="pinotBlanc.title" />
                </Typography>
                <Box height={500} width={500}>
                    <Paper>
                        <VictoryChart
                            animate={{ duration: 1000 }}
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
            </Route>
            <Route exact path="/pinot-blanc/top">
                <Typography variant="h1">
                    <FormattedMessage defaultMessage="Pinot Blanc" id="pinotBlanc.title" />
                </Typography>
                <Box height={500} width={500}>
                    <Paper>
                        <VictoryChart
                            animate={{ duration: 1000 }}
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
            </Route>
            <Redirect to={PAGE_NOT_FOUND_PATH} />
        </Switch>
    );
}
