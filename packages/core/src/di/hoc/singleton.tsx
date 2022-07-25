// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import * as React from 'react';
import withInject, { IWithDiProps } from './withInject';

/**
 * Ensures the supplied Component is only rendered once at any given time. This is important
 * for service providers which might be referenced multiple times (i.e. notification service)
 * but should not re-bind services to DI or introduce new DOM elements when already rendered.
 */
const singleton = <TProps extends React.PropsWithChildren<unknown>>(
  boundServiceId: string,
  Component: React.ComponentType<TProps>,
) => {
  return withInject(
    class extends React.Component<TProps & IWithDiProps, unknown> {
      public displayName = 'singletonWithInject';
      public render() {
        if (this.props.container.isBound(boundServiceId)) {
          return this.props.children;
        } else {
          return <Component {...this.props}>{this.props.children}</Component>;
        }
      }
    },
  );
};

export default singleton;
