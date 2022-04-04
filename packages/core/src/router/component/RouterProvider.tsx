// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import BindToDi from '../../di/component/BindToDi';
import UniversalRouter from 'universal-router';
import { BrowserHistory, createBrowserHistory } from 'history';
import serviceIds from '../../core/serviceIds';
import IMo360Context from '../lib/interface/IMo360Context';
import RouteQueryType from '../lib/RouteQuery.type';
import RouteType from '../lib/Route.type';
import RouterServiceType from '../lib/RouterService.type';
import RouteParameterType from '../lib/RouteParameter.type';
import RouteConfigType from '../lib/RouteConfig.type';
import StrategyType from '../lib/serializeRouteInUrlStrategy/Strategy.type';
import { useDi, useFromDi } from '../../util/Hooks';

const generateUrls: Function = require('universal-router/generateUrls').default;

const RouterProvider: React.FunctionComponent<{}> = (props) => {
  const serializeRouteInUrlStrategy = useFromDi<StrategyType>(serviceIds.routerSerializeRouteInUrlStrategy);
  const container = useDi();
  const routes: RouteConfigType = container.get(serviceIds.routes);
  const [activeRoute, setActiveRoute] = useState<RouteType & { component: React.ComponentType<any> }>(null);
  const [history, setHistory] = useState<BrowserHistory>(createBrowserHistory());
  const router = new UniversalRouter<React.ComponentType<any>, IMo360Context>(routes, {
    resolveRoute: (context, params) => {
      if (typeof context.route.action === 'function') {
        const buffer = context.route.action(context, params);

        setActiveRoute({
          query: context.query,
          parameter: context.params,
          component: buffer as React.ComponentType<any>,
          url: context.url,
          name: context.route.name,
        });

        return buffer;
      }
      return undefined;
    },
  });
  const url = generateUrls(router);
  const activeRouteRef = useRef<typeof activeRoute>();

  activeRouteRef.current = activeRoute;

  useEffect(() => {
    const hydrateRoute = () => {
      const payload = serializeRouteInUrlStrategy.deserialize(window.location.href);
      router.resolve({
        pathname: payload.pathname,
        query: payload.query,
        url: window.location.href,
      });
    };

    hydrateRoute();

    return history.listen(() => {
      hydrateRoute();
    });
  }, []);

  if (!activeRoute) {
    return null;
  }

  const Route = activeRoute.component;

  return (
    <BindToDi
      services={(container) => {
        container.bind<RouterServiceType>(serviceIds.routerService).toConstantValue({
          getRoute() {
            return {
              parameter: activeRouteRef.current.parameter,
              query: activeRouteRef.current.query,
              name: activeRouteRef.current.name,
              url: activeRouteRef.current.url,
            };
          },
          linkTo(name: string, parameter: RouteParameterType = {}, query: RouteQueryType = {}) {
            return serializeRouteInUrlStrategy.serialize(
              {
                pathname: url(name, parameter),
                query: query,
              },
              activeRouteRef.current.url,
            );
          },
          linkToHome(): string {
            throw new Error(
              "linkToHome() is deprecated, since the home-route is based on your configuration. Please use linkTo('name-of-your-home-route') instead.",
            );
          },
          navigate(url: string) {
            history.push(url);
          },
          navigateToHome() {
            throw new Error(
              "linkToHome() is deprecated, since the home-route is based on your configuration. Please use navigateTo('name-of-your-home-route') instead.",
            );
          },
          navigateTo(name: string, parameter: RouteParameterType = {}, query: RouteQueryType = {}) {
            history.push(
              serializeRouteInUrlStrategy.serialize(
                {
                  pathname: url(name, parameter),
                  query: query,
                },
                activeRouteRef.current.url,
              ),
            );
          },
        });
      }}
    >
      <Route key={activeRoute.url} url={activeRoute.url} />
    </BindToDi>
  );
};

export default RouterProvider;
