// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import withLayout from '../decorators/withLayout';
import DemoContent from './DemoContent';
import Home from './Home';
import { IRouteConfig } from '@daimler/ftk-core';

const LayoutHome = withLayout(Home);
const LayoutDemoContent = withLayout(DemoContent);

const routes: IRouteConfig[] = [
  {
    component: LayoutHome,
    name: 'home',
    pattern: '/',
  },
  {
    component: LayoutDemoContent,
    name: 'demoContent',
    pattern: '/demoContent',
  },
];

export default routes;
