// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import IRoute, { RouteParameter, RouteQuery, RouteComponent } from './IRoute';

interface IRouter {
    navigate(path: string, query?: RouteQuery): void;
    addRoute(name: string, pattern: string, component: RouteComponent, forceRemount?: boolean): void;
    removeRoute(name: string): void;
    getActiveRoute(): IRoute;
    linkTo(name: string, parameter?: RouteParameter, query?: RouteQuery): string;
}

export default IRouter;
