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

import { alpha, createTheme, darken, lighten } from "@mui/material";

const color = "#4762B9";
const theme = createTheme();

export const light = createTheme({
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    color: theme.palette.common.white,
                },
            },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    background: alpha(theme.palette.common.white, 0.5),
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: color,
                    borderColor: color,
                },
                root: {
                    width: theme.spacing(8),
                },
            },
        },
        MuiList: {
            styleOverrides: {
                padding: {
                    paddingBottom: 0,
                    paddingTop: 0,
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    "& a": {
                        color: theme.palette.common.white,
                        display: "flex",
                        padding: theme.spacing(2),
                        textDecoration: "none",
                    },
                    "&.Mui-selected": {
                        background: darken(color, 0.2),
                    },
                    "&.Mui-selected:hover": {
                        background: darken(color, 0.2),
                    },
                    "&:hover": {
                        background: darken(color, 0.1),
                    },
                    display: "block",
                    padding: 0,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    "& svg": {
                        display: "block",
                        height: theme.spacing(4),
                        width: theme.spacing(4),
                    },
                    color: theme.palette.common.white,
                    display: "block",
                    minWidth: theme.spacing(4),
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: theme.typography.body2.fontSize,
                    padding: theme.spacing(0.25, 8, 0.25, 2),
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    background: theme.palette.common.white,
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    [theme.breakpoints.down("sm")]: {
                        padding: theme.spacing(1.2),
                    },
                    padding: theme.spacing(2),
                },
            },
        },
    },
    palette: {
        background: {
            default: lighten(color, 0.98),
        },
        mode: "light",
        primary: {
            main: color,
        },
    },
    typography: {
        body1: {
            fontSize: 14,
        },
        body2: {
            fontSize: 12,
        },
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        h1: {
            fontSize: 28,
            fontWeight: 500,
            margin: theme.spacing(2, 0),
        },
        h2: {
            fontSize: 24,
            fontWeight: 500,
        },
    },
});

export const dark = createTheme({
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    color: theme.palette.common.white,
                },
            },
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    background: alpha(theme.palette.common.white, 0.1),
                },
            },
        },
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: darken(color, 0.88),
                    borderColor: darken(color, 0.88),
                },
                root: {
                    width: theme.spacing(8),
                },
            },
        },
        MuiList: {
            styleOverrides: {
                padding: {
                    paddingBottom: 0,
                    paddingTop: 0,
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    "& a": {
                        color: theme.palette.common.white,
                        display: "flex",
                        padding: theme.spacing(2),
                        textDecoration: "none",
                    },
                    "&.Mui-selected": {
                        background: theme.palette.common.black,
                    },
                    "&.Mui-selected:hover": {
                        background: theme.palette.common.black,
                    },
                    "&:hover": {
                        background: darken(color, 0.92),
                    },
                    padding: 0,
                    transition: "none",
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    "& svg": {
                        display: "block",
                        height: theme.spacing(4),
                        width: theme.spacing(4),
                    },
                    color: theme.palette.common.white,
                    display: "block",
                    minWidth: theme.spacing(4),
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: theme.typography.body2.fontSize,
                    padding: theme.spacing(0.25, 8, 0.25, 2),
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    background: darken(color, 0.9),
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    [theme.breakpoints.down("sm")]: {
                        padding: theme.spacing(1.2),
                    },
                    padding: theme.spacing(2),
                },
            },
        },
    },
    palette: {
        background: {
            default: darken(color, 0.82),
            paper: darken(color, 0.82),
        },
        mode: "dark",
        primary: {
            main: color,
        },
    },
    typography: {
        body1: {
            fontSize: 14,
        },
        body2: {
            fontSize: 12,
        },
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        h1: {
            fontSize: 28,
            fontWeight: 500,
            margin: theme.spacing(2, 0),
        },
        h2: {
            fontSize: 24,
            fontWeight: 500,
        },
    },
});
