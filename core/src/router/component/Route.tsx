// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { once } from 'lodash';
import * as React from 'react';
import { IDiContainer } from '../..';
import serviceIds from '../../core/serviceIds';
import BindToDi from '../../di/component/BindToDi';
import inject from '../../di/hoc/inject';
import withInject from '../../di/hoc/withInject';
import Url from '../../util/Url';
import IRouter from '../lib/interface/IRouter';
import Router from '../lib/Router';
import { RouterService } from '../lib/RouterService';
import IUrlFormatStrategy from '../lib/urlFormatStrategy/interface/IUrlFormatStrategy';
import IRouteConfig from './interface/IRouteConfig';

class Route extends React.Component {
  @inject(serviceIds.routes) private routes: IRouteConfig[];

  @inject(serviceIds.routerUrlFormatStrategy) private urlFormatStrategy: IUrlFormatStrategy;

  private router: IRouter;
  private hashChangeHandler: (path: string, query: any) => void;

  private bindService = once((container: IDiContainer) => {
    const routerService = new RouterService(this.router, this.urlFormatStrategy);
    container.bind<RouterService>(RouterService).toConstantValue(routerService);
  });

  private setupRoutes = once(() => {
    this.routes.map((route) => {
      this.router.addRoute(route.name, route.pattern, route.component, route.forceRemount);
    });
  });

  constructor(props: {}) {
    super(props);
    this.router = new Router();
    this.hashChangeHandler = this.hashChange.bind(this);
  }

  public componentDidMount() {
    this.hashChange();
    window.addEventListener('hashchange', this.hashChangeHandler as any);
  }

  public componentWillUnmount(): void {
    window.removeEventListener('hashchange', this.hashChangeHandler as any);
  }

  public render() {
    if (this.props.children) {
      console.error('React children composition error: Route is not supposed to have children.');
    }

    this.setupRoutes();

    const activeRoute = this.router.getActiveRoute();
    if (!activeRoute) {
      return null;
    }

    return (
      <BindToDi services={this.bindService}>
        <activeRoute.component
          key={activeRoute.forceRemount ? activeRoute.url : activeRoute.pattern}
          url={activeRoute.url}
        />
      </BindToDi>
    );
  }

  private navigate(path: string, query: any = {}): void {
    this.router.navigate(path, query);
    this.forceUpdate();
  }

  private hashChange = () => {
    const url = this.urlFormatStrategy.extract(document.location.hash) || '/';

    this.navigate(Url.buildPathFromSegments(Url.extractPath(url)), Url.extractQuery(url));
  };
}

export default withInject(Route);
