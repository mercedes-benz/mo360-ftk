// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { IRouteConfig, ISwidget, Route, serviceIds, App } from '@daimler/ftk-core';
import { omit } from 'lodash';
import * as React from 'react';

export interface IProps {
  prop1: string;
  prop2: number;
  prop3: object;
  registerDefaultRoute: boolean;
}

const SwidgetComponent: ISwidget<IProps> = (props: IProps) => (
  <App
    name="ExampleSwidget"
    init={(container) => {
      if (props.registerDefaultRoute) {
        container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue([
          {
            component: () => (
              <pre className="example-swidget-props">{JSON.stringify(omit(props, 'registerDefaultRoute'))}</pre>
            ),
            name: 'home',
            pattern: '/',
          },
        ]);
      }
    }}
  >
    {props.registerDefaultRoute && <Route />}
    {!props.registerDefaultRoute && (
      <h1 className="example-swidget-children">I use my child components because there are no routes registered</h1>
    )}
  </App>
);

SwidgetComponent.defaultProps = {
  registerDefaultRoute: true,
};

SwidgetComponent.metadata = {};

export default SwidgetComponent;
