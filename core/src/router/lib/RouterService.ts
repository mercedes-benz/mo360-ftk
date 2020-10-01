// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import IRouterService from '../component/interface/IRouterService';
import { RouteParameter, RouteQuery } from './interface/IRoute';
import IRouter from './interface/IRouter';
import IUrlFormatStrategy from './urlFormatStrategy/interface/IUrlFormatStrategy';

export class RouterService implements IRouterService {
    public static $$injectionKey = 'RouterService';

    private urlFormatStrategy: IUrlFormatStrategy;
    private router: IRouter;

    constructor(router: IRouter, urlFormatStrategy: IUrlFormatStrategy) {
        this.urlFormatStrategy = urlFormatStrategy;
        this.router = router;
    }

    public getRoute() {
        const { name, url, parameter, query } = this.router.getActiveRoute();
        return { name, url, parameter, query };
    }

    public linkTo(name: string, parameter: RouteParameter = {}, query: RouteQuery = {}) {
        return this.urlFormatStrategy.format(this.router.linkTo(name, parameter, query));
    }

    public linkToHome() {
        return this.urlFormatStrategy.format('/');
    }

    public navigate(url: string) {
        window.location.href = url;
    }

    public navigateToHome() {
        this.navigate(this.urlFormatStrategy.format('/'));
    }
}
