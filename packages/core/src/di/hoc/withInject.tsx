// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { omit } from 'lodash';
import * as React from 'react';
import { IDiContainer } from '../..';
import { diContext } from '../lib/diContext';

export interface IWithDiProps extends React.PropsWithChildren<unknown> {
  container?: IDiContainer;
}

export default function withInject<TProps>(
  Component: React.ComponentType<React.PropsWithChildren<TProps>>,
): React.ComponentType<TProps & IWithDiProps> {
  class ConsumeComponent extends React.Component<React.PropsWithChildren<TProps & IWithDiProps>, unknown> {
    public render() {
      return (
        <diContext.Consumer>
          {(container) => {
            const props = omit(this.props, 'container') as TProps;
            return (
              <Component {...props} container={container}>
                {this.props.children}
              </Component>
            );
          }}
        </diContext.Consumer>
      );
    }
  }
  return ConsumeComponent;
}
