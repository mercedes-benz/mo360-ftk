// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { App } from '@daimler/ftk-core';
import * as React from 'react';
import ComponentLoaderWithChildrenTest from './componentLoader/ComponentLoaderWithChildrenTest';

export default () => (
  <App name="componentLoaderWithChildren">
    <ComponentLoaderWithChildrenTest />
  </App>
);
