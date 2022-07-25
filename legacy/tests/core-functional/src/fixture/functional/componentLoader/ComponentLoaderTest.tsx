// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { inject, ISwidget, withInject } from '@daimler/ftk-core';
import { ComponentLoader } from '@daimler/ftk-core/lib/privateapi';
import { once } from 'lodash';
import * as React from 'react';

export interface IState {
  swidget?: ISwidget;
  firstLoadTime?: number;
  secondLoadTime?: number;
}

class ComponentLoaderTest extends React.Component<{}, IState> {
  public state: IState = {};

  public prerenderSetup = once(() => {
    const firstLoadStart = new Date().getTime();
    this.loadExternalComponent().then((swidget) => {
      const firstLoadTime = new Date().getTime() - firstLoadStart;
      this.setState({ swidget, firstLoadTime });

      const secondLoadStart = new Date().getTime();
      // test if the second request is answered by cache - should be very fast to load
      this.loadExternalComponent().then(() => {
        const secondLoadTime = new Date().getTime() - secondLoadStart;
        this.setState({ secondLoadTime });
      });
    });
  });

  @inject() private componentLoader: ComponentLoader;

  public render() {
    this.prerenderSetup();
    const App: React.ComponentType<any> = this.state.swidget || (() => null as any);

    return (
      <div>
        <div className="external-component-first-loadtime">{this.state.firstLoadTime}</div>
        <div className="external-component-second-loadtime">{this.state.secondLoadTime}</div>
        <App echo="Foobar" />
      </div>
    );
  }

  private loadExternalComponent(): Promise<ISwidget> {
    return this.componentLoader.load({
      name: 'ExternalEchoComponent',
      url: 'http://swidgets.localtest.me:8081/ExternalEchoComponent.js',
    });
  }
}

export default withInject(ComponentLoaderTest);
