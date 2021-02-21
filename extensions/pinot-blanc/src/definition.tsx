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

import { createExtensionDefinition } from "@coupage/core";
import { ExtensionComponent } from "@coupage/react";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, makeStyles, Typography } from "@material-ui/core";
import { Equalizer } from "@material-ui/icons";
import { extensionDefinitionTemplate, extensionPointNames } from "common";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    cardAvatar: {
        background: "#A3BA00",
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
        path: "/pinot-blanc",
    },
    navigation: {
        icon: <Equalizer />,
        label: <FormattedMessage defaultMessage="Pinot Blanc" id="pinotBlanc.menu" />,
        path: "/pinot-blanc",
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
                                aria-label={intl.formatMessage({ id: "pinotBlanc.widgetTitle" })}
                                className={classes.cardAvatar}
                            >
                                <Equalizer />
                            </Avatar>
                        }
                        title={
                            <Typography variant="h2">
                                <FormattedMessage defaultMessage="Pinot Blanc" id="pinotBlanc.widgetTitle" />
                            </Typography>
                        }
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography variant="body2">
                            <FormattedMessage
                                defaultMessage="Pinot blanc is a white wine grape. It is a point genetic mutation of Pinot noir. Pinot noir is genetically unstable and will occasionally experience a point mutation in which a vine bears all black fruit except for one cane which produces white fruit."
                                id="pinotBlanc.widgetSubtitle"
                            />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" component={Link} size="small" to="/pinot-blanc/top">
                            <FormattedMessage defaultMessage="Top Results" id="pinotBlanc.topResults" />
                        </Button>
                        <Button color="primary" component={Link} size="small" to="/pinot-blanc">
                            <FormattedMessage defaultMessage="All Results" id="pinotBlanc.allResults" />
                        </Button>
                    </CardActions>
                </Card>
            );
        },
    },
});
