// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { BindToDi, ConfigService, IDiContainer, IRouteConfig, Route, serviceIds, App } from '@daimler/ftk-core';
import { merge } from 'lodash';
import * as React from 'react';
import SerializeConfigToJsonComponent from './configuration/SerializeConfigToJsonComponent';

const registerRoutes = (container: IDiContainer) => {
  container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue([
    {
      component: SerializeConfigToJsonComponent,
      name: 'home',
      pattern: '/',
    },
  ]);
};

const registerConfig = (container: IDiContainer) => {
  // This is also an example on how to merge configurations from host/root with a swidget
  const parentConfig = container.get<ConfigService>(ConfigService).getConfig();
  container.bind(ConfigService).toConstantValue(
    new ConfigService(
      merge(parentConfig, {
        project: {
          prop1: 'value1',
          prop2: 'value2',
        },
        runtime: {},
      }),
    ),
  );
};

export default () => (
  <App name="configuration" init={registerRoutes}>
    <BindToDi services={registerConfig}>
      <Route />
    </BindToDi>
  </App>
);
