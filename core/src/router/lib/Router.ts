// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { assign } from 'lodash';
import { Registry } from '../../util/Registry';
import { RouteParser } from '../../util/route/RouteParser';
import Url from '../../util/Url';
import IRoute, { RouteParameter, RouteQuery, RouteComponent } from './interface/IRoute';
import IRouter from './interface/IRouter';
import IUrlQueryMap from '../../util/url/interface/IUrlQueryMap';

class Router implements IRouter {
    private routes: Registry<IRoute>;
    private route: IRoute;

    constructor() {
        this.routes = new Registry<IRoute>();
        this.route = null;
    }

    public navigate(path: string, query?: RouteQuery): void {
        path = path || '/';
        if (!path.startsWith('/')) {
            path = `/${path}`;
        }
        this.routes.forEach(item => {
            const parser: RouteParser = new RouteParser(item.pattern);
            const match: RouteParameter | boolean = parser.match(path);

            if (match) {
                this.route = assign({}, item, {
                    parameter: match,
                    query,
                    url: path + Url.buildQueryFromParameters(query as IUrlQueryMap),
                });
            }
        });
    }

    public addRoute(name: string, pattern: string, component: RouteComponent, forceRemount?: boolean): void {
        this.routes.add(name, {
            component,
            forceRemount,
            name,
            pattern,
        });
    }

    public hasRoute(name: string): boolean {
        return this.routes.has(name);
    }

    public removeRoute(name: string): void {
        this.routes.remove(name);
    }

    public getActiveRoute(): IRoute {
        return this.route;
    }

    public linkTo(name: string, parameter: RouteParameter = {}, query: RouteQuery = {}): string {
        let pattern: string;

        try {
            pattern = this.routes.get(name).pattern;
        } catch (e) {
            throw new Error(`Unknown route for link to route '${name}'.`);
        }

        if (pattern.indexOf('*') !== -1) {
            pattern = pattern.substr(0, pattern.indexOf('*'));
        }

        const parser: RouteParser = new RouteParser(pattern);

        return parser.createPathString(parameter) + Url.buildQueryFromParameters(query as IUrlQueryMap);
    }
}

export default Router;
