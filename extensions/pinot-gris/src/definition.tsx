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

import { createExtensionDefinition } from "@coupage/core";
import { ExtensionComponent } from "@coupage/react";
import { ViewComfy } from "@mui/icons-material";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography, useTheme } from "@mui/material";
import { extensionDefinitionTemplate, extensionPointNames } from "common";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

export default createExtensionDefinition(extensionDefinitionTemplate, {
    card: {
        component: function CardContainer() {
            const theme = useTheme();
            return (
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{
                                    background: "#BF2E2C",
                                }}
                            >
                                <ViewComfy />
                            </Avatar>
                        }
                        title={
                            <Typography variant="h2">
                                <FormattedMessage defaultMessage="Pinot Gris" id="pinotGris.title" />
                            </Typography>
                        }
                    />
                    <CardContent
                        sx={{
                            minHeight: theme.spacing(20),
                        }}
                    >
                        <Typography variant="body2">
                            <FormattedMessage
                                defaultMessage="Pinot gris, pinot grigio or Grauburgunder is a white wine grape variety of the species Vitis vinifera. Thought to be a mutant clone of the pinot noir variety, it normally has a grayish-blue fruit, accounting for its name but the grapes can have a brownish pink to black and even white appearance."
                                id="pinotGris.subtitle"
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
        data: 200,
    },
    content: {
        component: function ContentContainer() {
            return <ExtensionComponent name={extensionPointNames.content} />;
        },
        path: "/pinot-gris",
    },
    navigation: {
        icon: <ViewComfy />,
        label: <FormattedMessage defaultMessage="Pinot Gris" id="pinotGris.navigation" />,
        path: "/pinot-gris",
    },
});
