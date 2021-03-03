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

import { createExtensionDefinition } from "@coupage/core";
import { ExtensionComponent } from "@coupage/react";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ViewComfy } from "@material-ui/icons";
import { extensionDefinitionTemplate, extensionPointNames } from "common";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    cardAvatar: {
        background: "#BF2E2C",
        color: theme.palette.background.default,
    },
    cardContent: {
        minHeight: theme.spacing(20),
    },
}));

export default createExtensionDefinition(extensionDefinitionTemplate, {
    content: {
        component: function Content() {
            return <ExtensionComponent name={extensionPointNames.content} />;
        },
        path: "/pinot-gris",
    },
    navigation: {
        icon: <ViewComfy />,
        label: <FormattedMessage defaultMessage="Pinot Gris" id="pinotGris.menu" />,
        path: "/pinot-gris",
    },
    widget: {
        component: function Widget() {
            const classes = useStyles();
            const intl = useIntl();
            return (
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label={intl.formatMessage({ id: "pinotGris.widgetTitle" })}
                                className={classes.cardAvatar}
                            >
                                <ViewComfy />
                            </Avatar>
                        }
                        title={
                            <Typography variant="h2">
                                <FormattedMessage defaultMessage="Pinot Gris" id="pinotGris.widgetTitle" />
                            </Typography>
                        }
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography variant="body2">
                            <FormattedMessage
                                defaultMessage="Pinot gris, pinot grigio or Grauburgunder is a white wine grape variety of the species Vitis vinifera. Thought to be a mutant clone of the pinot noir variety, it normally has a grayish-blue fruit, accounting for its name but the grapes can have a brownish pink to black and even white appearance."
                                id="pinotGris.widgetSubtitle"
                            />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" component={Link} size="small" to="/pinot-gris/top">
                            <FormattedMessage defaultMessage="Top Results" id="pinotGris.topResults" />
                        </Button>
                        <Button color="primary" component={Link} size="small" to="/pinot-gris">
                            <FormattedMessage defaultMessage="All Results" id="pinotGris.allResults" />
                        </Button>
                    </CardActions>
                </Card>
            );
        },
    },
});
