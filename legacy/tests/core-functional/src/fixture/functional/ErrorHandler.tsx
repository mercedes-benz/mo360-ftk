// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { IDiContainer, IRouteConfig, Route, serviceIds, App } from '@daimler/ftk-core';
import * as React from 'react';
import WrapperComponent from './errorHandler/WrapperComponent';

const registerRoutes = (container: IDiContainer) => {
  container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue([
    {
      component: WrapperComponent,
      name: 'home',
      pattern: '/',
    },
  ]);
};
export default () => (
  <App name="errorHandler" init={registerRoutes}>
    <Route />
  </App>
);
