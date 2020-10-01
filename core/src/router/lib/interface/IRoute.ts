// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

export type RouteQuery = { [key: string]: string | number | boolean };
export type RouteParameter = { [key: string]: string };
export type RouteComponent = React.ComponentType<{url: string}>;

interface IRoute {
    name: string;
    pattern: string;
    component: RouteComponent;
    query?: RouteQuery;
    parameter?: RouteParameter;
    url?: string;
    forceRemount?: boolean;
}

export default IRoute;
