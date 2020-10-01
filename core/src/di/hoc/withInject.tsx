// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { omit } from 'lodash';
import * as React from 'react';
import { IDiContainer } from '../..';
import { diContext } from '../lib/diContext';

export interface IWithDiProps {
  container?: IDiContainer;
}

export default function withInject<TProps extends React.ComponentProps<any>>(
  Component: React.ComponentType<TProps>,
): React.ComponentType<TProps & IWithDiProps> {
  class ConsumeComponent extends React.Component<TProps & IWithDiProps, {}> {
    public render() {
      return (
        <diContext.Consumer>
          {(container) => {
            const props: TProps = omit(this.props, 'container') as any;
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
