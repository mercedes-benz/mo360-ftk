// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { DiContainer, IDiContainer, IRouteConfig, kernel, Route, serviceIds, App } from '@daimler/ftk-core';
import * as React from 'react';
import { ContainerContextSetup } from './dependencyInjection/containercontext';
import { DepOverwriteTestSetup, NestedKernelDepsSetup } from './dependencyInjection/kerneldeps';
import { SingletonTestComponentSetup } from './dependencyInjection/Singleton';

const getContainer = (name: string, Component: React.ComponentType<any> | null) => {
  const container = new DiContainer();
  container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue([
    {
      component: () => (
        <>
          <h1 className="nested">{name}</h1>
          {Component ? <Component /> : null}
        </>
      ),
      name,
      pattern: '/',
    },
  ]);
  return container;
};

export const MultiNestedKernel = kernel(
  '1',
  getContainer(
    '1',
    kernel(
      '2',
      getContainer(
        '2',
        kernel('3', getContainer('3', kernel('4', getContainer('4', kernel('5', getContainer('5', null)))))),
      ),
    ),
  ),
);

const registerTestRoutes = (container: IDiContainer) => {
  // needed for NestedKernelDeps test
  container.bind('hostcontainer').toConstantValue('hostcontainer');

  // needed for XHR dep override test
  container.bind('requiredRootDependency').toDynamicValue(() => {
    return 'root';
  });

  container.bind('rootDependency').toDynamicValue(() => {
    return container.get('requiredRootDependency');
  });

  container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue([
    {
      component: () => <h1>Default (no test selected)</h1>,
      name: 'home',
      pattern: '/',
    },
    {
      component: SingletonTestComponentSetup,
      name: 'singleton',
      pattern: '/singleton',
    },
    {
      component: MultiNestedKernel,
      name: 'nestedkernel',
      pattern: '/nested',
    },
    {
      component: ContainerContextSetup,
      name: 'containercontext',
      pattern: '/containercontext',
    },
    {
      component: NestedKernelDepsSetup,
      name: 'nestedkerneldeps',
      pattern: '/nestedkerneldeps',
    },
    {
      component: DepOverwriteTestSetup,
      name: 'depoverwrite',
      pattern: '/depoverwrite',
    },
  ]);
};
export default () => (
  <App name="testRoot" init={registerTestRoutes}>
    <Route />
  </App>
);
