// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import * as React from 'react';
import { IDiContainer } from '..';
import Route from '../router/component/Route';
import { App } from './App';

/**
 * @deprecated Use <App> instead
 */
export default function kernel<TProps = {}>(
  name: string,
  configurationContainer: IDiContainer,
): React.ComponentType<TProps> {
  const mergeContainers = (container: IDiContainer) => {
    configurationContainer.parent = container;
    return configurationContainer;
  };
  const AppHoc = (props: TProps) => {
    return (
      <App name={name} init={mergeContainers} {...props}>
        <Route />
      </App>
    );
  };
  AppHoc.displayName = 'AppHoc';
  return AppHoc;
}
