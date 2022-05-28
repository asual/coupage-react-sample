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

import { createTheme, darken, lighten } from "@mui/material";

const lightBase = createTheme({
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
    palette: {
        mode: "light",
        primary: {
            main: "#4762B9",
        },
    },
    typography: {
        body1: {
            fontSize: 14,
        },
        body2: {
            fontSize: 13,
        },
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        h1: {
            fontSize: 28,
            fontWeight: 500,
            marginBottom: 16,
            marginTop: 16,
        },
        h2: {
            fontSize: 24,
            fontWeight: 500,
        },
    },
});

export const light = createTheme(lightBase, {
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    color: lightBase.palette.common.white,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: lightBase.palette.primary.main,
                },
                root: {
                    width: lightBase.spacing(8),
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
                        padding: lightBase.spacing(2),
                    },
                    "&.Mui-selected": {
                        backgroundColor: darken(lightBase.palette.primary.main, 0.1),
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: darken(lightBase.palette.primary.main, 0.1),
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
                        height: lightBase.spacing(4),
                        width: lightBase.spacing(4),
                    },
                    color: lightBase.palette.common.white,
                    display: "block",
                    minWidth: lightBase.spacing(4),
                },
            },
        },
    },
});

const darkBase = createTheme({
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
    palette: {
        background: {
            default: "#282828",
        },
        mode: "dark",
        primary: {
            main: lighten("#4762B9", 0.2),
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
            marginBottom: 16,
            marginTop: 16,
        },
        h2: {
            fontSize: 24,
            fontWeight: 500,
        },
    },
});

export const dark = createTheme(darkBase, {
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    color: darkBase.palette.common.white,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: darkBase.palette.background.paper,
                },
                root: {
                    width: darkBase.spacing(8),
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
                        padding: darkBase.spacing(2),
                    },
                    "&.Mui-selected": {
                        backgroundColor: lighten(darkBase.palette.background.paper, 0.15),
                    },
                    "&.Mui-selected:hover": {
                        backgroundColor: lighten(darkBase.palette.background.paper, 0.15),
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
                        height: darkBase.spacing(4),
                        width: darkBase.spacing(4),
                    },
                    color: darkBase.palette.common.white,
                    display: "block",
                    minWidth: darkBase.spacing(4),
                },
            },
        },
    },
});
