// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import * as React from 'react';

import { IRouteConfig, Route, serviceIds, App, useConfig, useRouter } from '@daimler/ftk-core';

function ComponentUsingFtkCoreViaHooks() {
  const router = useRouter();
  const config = useConfig();

  return (
    <>
      <pre className="config">{JSON.stringify(config.getConfig())}</pre>
      <pre className="route">{JSON.stringify(router.getRoute())}</pre>
    </>
  );
}

export default () => (
  <App
    name="hooks"
    init={(container) => {
      container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue([
        {
          component: ComponentUsingFtkCoreViaHooks,
          name: 'home',
          pattern: '/',
        },
      ]);
    }}
  >
    <Route />
  </App>
);
