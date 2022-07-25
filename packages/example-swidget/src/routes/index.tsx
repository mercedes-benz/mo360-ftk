// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import withLayout from '../decorators/withLayout';
import DemoContent from './DemoContent';
import Home from './Home';
import { RouteConfig } from '@daimler/ftk-core';

const LayoutHome = withLayout(Home);
const LayoutDemoContent = withLayout(DemoContent);

const routes: RouteConfig = [
  {
    action: () => LayoutHome,
    name: 'home',
    path: '/',
  },
  {
    action: () => LayoutDemoContent,
    name: 'demoContent',
    path: '/demoContent',
  },
];

export default routes;
