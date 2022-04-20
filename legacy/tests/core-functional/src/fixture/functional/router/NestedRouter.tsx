// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { IRouteConfig, Route, serviceIds, App } from '@daimler/ftk-core';
import * as React from 'react';
import NavigationRemote from './NavigationRemote';

export default () => (
  <App
    name="nestedRouter"
    init={(container) => {
      container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue([
        {
          component: NavigationRemote,
          name: 'NestedDefault',
          pattern: '/',
        },
        {
          component: NavigationRemote,
          name: 'Nested1',
          pattern: '/nested1',
        },
        {
          component: NavigationRemote,
          name: 'Nested2',
          pattern: '/nested2',
        },
        {
          component: NavigationRemote,
          name: 'Nested3',
          pattern: '/nested3/:id',
        },
        {
          component: NavigationRemote,
          name: 'Nested4',
          pattern: '/nested4/:id/constant/:action',
        },
      ]);
    }}
  >
    <Route />
  </App>
);
