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
import { Home } from "@mui/icons-material";
import { Drawer, List } from "@mui/material";
import { extensionDefinitionTemplate, extensionPointNames } from "common";
import { FormattedMessage } from "react-intl";

import ApplicationNavigationItem from "components/ApplicationNavigationItem";

export default function ApplicationNavigation() {
    return (
        <Drawer variant="permanent">
            <List>
                <ApplicationNavigationItem
                    icon={<Home />}
                    label={<FormattedMessage defaultMessage="Home" id="application.navigation" />}
                    path="/"
                />
                <ExtensionPoint name={extensionPointNames.navigation}>
                    {({ icon, label, path }: typeof extensionDefinitionTemplate.navigation) => (
                        <ApplicationNavigationItem icon={icon} label={label} path={path} />
                    )}
                </ExtensionPoint>
            </List>
        </Drawer>
    );
}
