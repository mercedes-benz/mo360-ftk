// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { inject, IRouteConfig, ISwidget, Route, RouterService, serviceIds, App, withInject } from '@daimler/ftk-core';
import * as React from 'react';

class Home extends React.Component<{}> {
  @inject() private router: RouterService;

  @inject(serviceIds.currentSwidget.uniqueId) private uniqueId: string;

  public render() {
    return (
      <>
        <h1>
          Home Route of Swidget with uniqueId:
          <span className="swidget-uniqueid">{this.uniqueId}</span>
        </h1>
        <a className={`goto-sr${this.uniqueId}1`} href={this.router.linkTo('subroute1')}>
          Go to SubRoute1 in Swidget {this.uniqueId}
        </a>
        <br />
        <a className={`goto-sr${this.uniqueId}2`} href={this.router.linkTo('subroute2')}>
          Go to SubRoute2 in Swidget {this.uniqueId}
        </a>
      </>
    );
  }
}
const HomeComponent = withInject(Home);

export interface IProps {
  subroute1: React.ComponentType<any>;
  subroute2: React.ComponentType<any>;
}

const SwidgetComponent: React.SFC<IProps> = (props: IProps) => {
  const SubRoute1 = props.subroute1;
  const SubRoute2 = props.subroute2;

  return (
    <App
      name="SwidgetWithSubRoutes"
      init={(container) => {
        const routes: IRouteConfig[] = [
          {
            component: HomeComponent,
            name: 'home',
            pattern: '/',
          },
          {
            component: SubRoute1,
            name: 'subroute1',
            pattern: '/subroute1',
          },
          {
            component: SubRoute2,
            name: 'subroute2',
            pattern: '/subroute2',
          },
        ];

        container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue(routes);
      }}
    >
      <Route />
    </App>
  );
};

const swidget: ISwidget<IProps> = (props) => {
  return <SwidgetComponent {...props} />;
};

swidget.metadata = {};

export default swidget;
