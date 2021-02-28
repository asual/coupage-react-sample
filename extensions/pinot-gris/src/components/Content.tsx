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

import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import { PAGE_NOT_FOUND_PATH } from "common";
import { FormattedMessage } from "react-intl";
import { Redirect, Route, Switch } from "react-router-dom";

export default function Content() {
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
            y: 5 + Math.ceil(Math.random() * 10),
        },
        {
            x: new Date(2020, 1, 1),
            y: 5 + Math.ceil(Math.random() * 10),
        },
    ]);
    const chartScale = ["#6984E0", "#966ECC", "#B656AD", "#C83D85", "#CB2C59", "#BF2E2C"];

    return (
        <Switch>
            <Route exact path="/pinot-gris">
                <Typography variant="h1">
                    <FormattedMessage defaultMessage="Pinot Gris" id="pinotGris.title" />
                </Typography>
                <Box height={500} width={500}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {chartData.map((data, i) => (
                                        <TableCell component="th" key={i} style={{ color: chartScale[i] }}>
                                            <Typography align="center" variant="body1">
                                                <strong>{data[i].x.getFullYear()}</strong>
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {chartData.map((data, i) => (
                                    <TableRow key={i}>
                                        {data.map((item, j) => (
                                            <TableCell key={j}>
                                                <Typography align="center" variant="body1">
                                                    {item.y}
                                                </Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={chartData.length}>
                                        <Typography variant="body1">
                                            <FormattedMessage defaultMessage="All Results" id="pinotGris.allResults" />
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Paper>
                </Box>
            </Route>
            <Route exact path="/pinot-gris/top">
                <Typography variant="h1">
                    <FormattedMessage defaultMessage="Pinot Gris" id="pinotGris.title" />
                </Typography>
                <Box height={500} width={500}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {chartData.map((data, i) => (
                                        <TableCell component="th" key={i} style={{ color: chartScale[i] }}>
                                            <Typography align="center" variant="body1">
                                                <strong>{data[i].x.getFullYear()}</strong>
                                            </Typography>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {chartData.slice(0, 3).map((data, i) => (
                                    <TableRow key={i}>
                                        {data.map((item, j) => (
                                            <TableCell key={j}>
                                                <Typography align="center" variant="body1">
                                                    {item.y}
                                                </Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={chartData.length}>
                                        <Typography variant="body1">
                                            <FormattedMessage defaultMessage="Top Results" id="pinotGris.topResults" />
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Paper>
                </Box>
            </Route>
            <Redirect to={PAGE_NOT_FOUND_PATH} />
        </Switch>
    );
}
