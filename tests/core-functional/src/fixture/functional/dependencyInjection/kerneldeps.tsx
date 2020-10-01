// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { IRouteConfig, Route, serviceIds, App } from '@daimler/ftk-core';
import { findBoundContainer } from '@daimler/ftk-core/lib/privateapi';
import * as React from 'react';

export class NestedKernelDepsSetup extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  public render() {
    return (
      <App
        name="nesting1"
        init={(container) => {
          container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue([
            {
              component: () => <h1 className="nested">{container.get('hostcontainer')}</h1>,
              name: 'home',
              pattern: '/',
            },
          ]);
        }}
      >
        <Route />
      </App>
    );
  }
}

export function DepOverwriteTestSetup() {
  return (
    <App
      name="overwrite"
      init={(container) => {
        const containerForRebind = findBoundContainer(container, 'requiredRootDependency');
        containerForRebind.rebind('requiredRootDependency').toDynamicValue(() => {
          return 'nested';
        });

        container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue([
          {
            component: () => <h1 className="nested">{container.get('rootDependency')}</h1>,
            name: 'home',
            pattern: '/',
          },
        ]);
      }}
    >
      <Route />
    </App>
  );
}
