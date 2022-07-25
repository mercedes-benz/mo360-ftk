// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { IRouteConfig, serviceIds, App } from '@daimler/ftk-core';
import * as React from 'react';
import BrokenComponent from './BrokenComponent';
import ValidComponent from './ValidComponent';

const BrokenApp = () => (
  <App
    name="broken"
    init={(container) => {
      container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue([
        {
          component: BrokenComponent,
          name: 'home',
          pattern: '/',
        },
      ]);
    }}
  />
);

export interface IState {
  broken: boolean;
}

class WrapperComponent extends React.Component<{}, IState> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      broken: false,
    };
  }

  public render() {
    if (this.state.broken === true) {
      return (
        <div className="test-wrapper">
          <BrokenComponent />
          <ValidComponent />
        </div>
      );
    } else {
      return (
        <div className="test-wrapper">
          <button
            className="test-toggle"
            onClick={() => {
              this.setState({
                broken: true,
              });
            }}
          >
            load broken
          </button>
          <BrokenApp />
          <ValidComponent />
        </div>
      );
    }
  }
}

export default WrapperComponent;
