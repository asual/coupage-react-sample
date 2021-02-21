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

import { ListItem, ListItemIcon, Tooltip } from "@material-ui/core";
import { ReactElement } from "react";
import { MessageDescriptor, useIntl } from "react-intl";
import { Link, useRouteMatch } from "react-router-dom";

interface NavigationItemProps {
    exact?: boolean;
    icon: ReactElement;
    label: ReactElement<MessageDescriptor>;
    path: string;
}

export default function NavigationItem({ exact = false, icon, label, path }: NavigationItemProps) {
    const intl = useIntl();
    const routeMatch = useRouteMatch({
        exact,
        path,
    });

    return (
        <Tooltip placement="right" title={label}>
            <ListItem disableGutters selected={!!routeMatch}>
                <Link aria-label={intl.formatMessage({ id: label.props.id })} to={path}>
                    <ListItemIcon>{icon}</ListItemIcon>
                </Link>
            </ListItem>
        </Tooltip>
    );
}
