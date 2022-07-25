// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { IDiContainer, IRouteConfig, Route, serviceIds, SwidgetLoader, App } from '@daimler/ftk-core';
import * as React from 'react';
import AssetResolverTest from './componentLoader/AssetResolverTest';
import ComponentLoaderTest from './componentLoader/ComponentLoaderTest';
import FallbackComponentTest from './componentLoader/FallbackComponentTest';

export const TestSwidgetLoader: React.SFC<{ name: string; uniqueId: string } & any> = (props) => {
  const { name, uniqueId } = props;
  const url = `http://swidgets.localtest.me:8081/${name}.js`;
  return <SwidgetLoader name={name} url={url} uniqueId={uniqueId} props={props.props} />;
};

const registerRoutes = (container: IDiContainer) => {
  container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue([
    {
      component: ComponentLoaderTest,
      name: 'home',
      pattern: '/',
    },
    {
      component: AssetResolverTest,
      name: 'assets',
      pattern: '/assets',
    },
    {
      component: FallbackComponentTest,
      name: 'fallback',
      pattern: '/fallback',
    },
    {
      component: () => (
        <TestSwidgetLoader
          name="ExampleSwidget"
          props={{
            prop1: 'foo',
            prop2: 42,
            prop3: { key1: 'value1' },
          }}
        />
      ),
      name: 'componentloader',
      pattern: '/exampleswidget',
    },
    {
      component: () => (
        <TestSwidgetLoader
          name="ExampleSwidget"
          props={{
            registerDefaultRoute: false,
          }}
        />
      ),
      name: 'componentloader2',
      pattern: '/exampleswidgetchildren',
    },
    {
      component: () => <TestSwidgetLoader name="ExternalEchoComponent" uniqueId="123" />,
      name: 'echo',
      pattern: '/echo',
    },
    {
      component: () => (
        <>
          <TestSwidgetLoader
            name="SwidgetWithSubRoutes"
            uniqueId="1"
            props={{
              subroute1: () => <h1 className="subroute-sr11">SR1_1</h1>,
              subroute2: () => <h1 className="subroute-sr12">SR1_2</h1>,
            }}
          />

          <TestSwidgetLoader
            name="SwidgetWithSubRoutes"
            uniqueId="2"
            props={{
              subroute1: () => <h1 className="subroute-sr21">SR2_1</h1>,
              subroute2: () => <h1 className="subroute-sr22">SR2_2</h1>,
            }}
          />
        </>
      ),
      name: 'subroutes',
      pattern: '/subroutes',
    },
  ]);
};

export default () => (
  <App name="componentLoader" init={registerRoutes}>
    <Route />
  </App>
);
