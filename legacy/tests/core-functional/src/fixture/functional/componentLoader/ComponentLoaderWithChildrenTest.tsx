// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { inject, ISwidget, withInject } from '@daimler/ftk-core';
import { ComponentLoader } from '@daimler/ftk-core/lib/privateapi';
import { once } from 'lodash';
import * as React from 'react';

export interface IState {
  swidget?: ISwidget;
}

class ComponentLoaderWithChildrenTest extends React.Component<{}, IState> {
  public state: IState = {};

  public setup = once(() => {
    this.componentLoader
      .load({
        name: 'ExternalComponentWithChildren',
        url: 'http://swidgets.localtest.me:8081/ExternalComponentWithChildren.js',
      })
      .then((swidget) => {
        this.setState({ swidget });
      });
  });

  @inject() private componentLoader: ComponentLoader;

  public render() {
    this.setup();

    const App = this.state.swidget || (() => null as any);

    return (
      <div>
        <App>
          <div className="external-component-child">Foobar</div>
        </App>
      </div>
    );
  }
}

export default withInject(ComponentLoaderWithChildrenTest);
