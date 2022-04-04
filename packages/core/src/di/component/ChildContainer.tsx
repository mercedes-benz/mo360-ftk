// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { Container } from 'inversify';
import { once } from 'lodash';
import * as React from 'react';
import { IDiContainer } from '../..';
import { diContext } from '../lib/diContext';

/**
 * Explicitly creates a new inversify Container that inherits from its parent scope and
 * will be supplied to all child components.
 */
export default class ChildContainer extends React.Component<{}, {}> {
  private setupContainer = once((container: IDiContainer) => {
    const childContainer = new Container();
    childContainer.parent = container;
    return childContainer;
  });

  public render() {
    return (
      <diContext.Consumer>
        {(container) => {
          const childContainer = this.setupContainer(container);
          return <diContext.Provider value={childContainer}>{this.props.children}</diContext.Provider>;
        }}
      </diContext.Consumer>
    );
  }
}
