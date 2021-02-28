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

import { createMuiTheme, darken, lighten } from "@material-ui/core/styles";

export const lightTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#4762B9",
        },
        type: "light",
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

lightTheme.overrides = {
    MuiAvatar: {
        colorDefault: {
            backgroundColor: lightTheme.palette.common.white,
            color: lightTheme.palette.common.black,
        },
    },
    MuiDrawer: {
        paper: {
            background: lightTheme.palette.primary.main,
        },
        root: {
            width: lightTheme.spacing(8),
        },
    },
    MuiList: {
        padding: {
            paddingBottom: 0,
            paddingTop: 0,
        },
    },
    MuiListItem: {
        root: {
            "& a": {
                padding: lightTheme.spacing(2),
            },
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
        },
    },
    MuiListItemIcon: {
        root: {
            "& svg": {
                height: lightTheme.spacing(4),
                width: lightTheme.spacing(4),
            },
            color: lightTheme.palette.common.white,
            minWidth: lightTheme.spacing(4),
        },
    },
};

export const darkTheme = createMuiTheme({
    palette: {
        background: {
            default: "#202020",
        },
        primary: {
            main: lighten("#4762B9", 0.5),
        },
        type: "dark",
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

darkTheme.overrides = {
    MuiAvatar: {
        colorDefault: {
            backgroundColor: darkTheme.palette.background.default,
            color: lightTheme.palette.common.white,
        },
    },
    MuiDrawer: {
        paper: {
            backgroundColor: darken(darkTheme.palette.background.default, 0.2),
        },
        paperAnchorDockedLeft: {
            borderRightColor: darken(darkTheme.palette.background.default, 0.1),
        },
        root: {
            width: darkTheme.spacing(8),
        },
    },
    MuiList: {
        padding: {
            paddingBottom: 0,
            paddingTop: 0,
        },
    },
    MuiListItem: {
        root: {
            "& a": {
                padding: darkTheme.spacing(2),
            },
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
        },
    },
    MuiListItemIcon: {
        root: {
            "& svg": {
                height: darkTheme.spacing(4),
                width: darkTheme.spacing(4),
            },
            color: darkTheme.palette.common.white,
            minWidth: darkTheme.spacing(4),
        },
    },
};
