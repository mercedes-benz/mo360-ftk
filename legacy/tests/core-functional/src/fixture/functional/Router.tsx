// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { IDiContainer, IRouteConfig, Route, serviceIds, App } from '@daimler/ftk-core';
import * as React from 'react';
import ArrowFunctionComponent from './router/ArrowFunctionComponent';
import ClassComponent from './router/ClassComponent';
import FunctionComponent from './router/FunctionComponent';
import MountComponent from './router/MountComponent';
import NavigationRemote from './router/NavigationRemote';
import NestedRouter from './router/NestedRouter';

const registerRoutes = (container: IDiContainer) => {
  container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue([
    {
      component: () => <h1 className="router-default">Default</h1>,
      name: 'Default',
      pattern: '/',
    },
    {
      component: () => (
        <div>
          <h1 className="router-test-1">Test1</h1>
          <NavigationRemote />
        </div>
      ),
      name: 'Test1',
      pattern: '/test1',
    },
    {
      component: () => <h1 className="router-test-2">Test2</h1>,
      name: 'Test2',
      pattern: '/test2',
    },
    {
      component: NavigationRemote,
      name: 'Test3',
      pattern: '/test3/:paramId',
    },
    {
      component: () => (
        <div>
          <h1 className="router-test-4">Test4</h1>
          <NavigationRemote />
        </div>
      ),
      name: 'Test4',
      pattern: '/test4/:id?',
    },
    {
      component: NestedRouter,
      name: 'NestingHost',
      pattern: '/host',
    },
    {
      component: () => <div className="router-test-jsx">JSX Element</div>,
      name: 'JsxElement',
      pattern: '/jsx-element',
    },
    {
      component: ClassComponent,
      name: 'ClassComponent',
      pattern: '/class-component',
    },
    // {
    //   component: <ClassComponent />,
    //   name: 'ClassComponentElement',
    //   pattern: '/class-component-element',
    // },
    {
      component: ArrowFunctionComponent,
      name: 'ArrowFunctionComponent',
      pattern: '/arrow-function-component',
    },
    // {
    //   component: <ArrowFunctionComponent />,
    //   name: 'ArrowFunctionComponentElement',
    //   pattern: '/arrow-function-component-element',
    // },
    {
      component: FunctionComponent,
      name: 'FunctionComponent',
      pattern: '/function-component',
    },
    // {
    //   component: <FunctionComponent />,
    //   name: 'FunctionComponentElement',
    //   pattern: '/function-component-element',
    // },
    {
      component: MountComponent,
      name: 'MountComponent',
      pattern: '/mount-component/:paramId',
    },
    // {
    //   component: <MountComponent />,
    //   name: 'MountComponentElement',
    //   pattern: '/mount-component-element/:paramId',
    // },
    {
      component: MountComponent,
      name: 'DuplicateMountComponent',
      pattern: '/duplicate-mount-component/:paramId',
    },
    // {
    //   component: <MountComponent />,
    //   name: 'DuplicateMountComponentElement',
    //   pattern: '/duplicate-mount-component-element/:paramId',
    // },
    {
      component: MountComponent,
      forceRemount: true,
      name: 'ForceMountComponent',
      pattern: '/force-mount-component/:paramId',
    },
    // {
    //   component: <MountComponent />,
    //   forceRemount: true,
    //   name: 'ForceMountComponentElement',
    //   pattern: '/force-mount-component-element/:paramId',
    // },
  ]);
};

export default () => (
  <App name="router" init={registerRoutes}>
    <Route />
  </App>
);
