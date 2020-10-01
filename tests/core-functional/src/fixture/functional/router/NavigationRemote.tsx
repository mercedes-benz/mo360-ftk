// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { inject, RouterService, withInject } from '@daimler/ftk-core';
import { IRoute } from '@daimler/ftk-core/lib/privateapi';
import * as React from 'react';

export interface INavigationRemoteState {
  echo?: string;
  currentRoute?: IRoute;

  nextRouteName?: string;
  nextRouteParams?: string;
  nextRouteQuery?: string;
}

export interface IProps {
  redirectToRoute?: string;
  redirectWithDummyQueryString?: boolean;
}

class NavigationRemote extends React.Component<IProps, INavigationRemoteState> {
  public state: INavigationRemoteState = {};

  @inject() private router: RouterService;

  public componentDidUpdate(prevProps: IProps): void {
    if (this.props !== prevProps) {
      this.update();
    }
  }

  public componentDidMount() {
    this.update();
  }

  public render() {
    if (!this.state.currentRoute) {
      return null;
    }
    return (
      <div className="router-navigation-remote">
        <h1>
          Active Route: <span className="route-name">{this.state.currentRoute.name}</span>
        </h1>
        <div className="route-echo">{this.state.echo}</div>
        <div className="route-querystring">{JSON.stringify(this.state.currentRoute.query)}</div>
        <div className="route-params">{JSON.stringify(this.state.currentRoute.parameter)}</div>

        {/* remote controll our navigation process through those inputs */}
        <input
          className="nextroute-name"
          type="text"
          placeholder="Enter name of next route"
          value={this.state.nextRouteName}
          onChange={(ev) => this.updateNextRouteName(ev)}
        />
        <br />
        <input
          className="nextroute-params"
          type="text"
          placeholder="Enter JSON representation of next route params"
          value={this.state.nextRouteParams}
          onChange={(ev) => this.updateNextRouteParams(ev)}
        />
        <br />
        <input
          className="nextroute-query"
          type="text"
          onChange={(ev) => this.updateNextRouteQuery(ev)}
          value={this.state.nextRouteQuery}
          placeholder="Enter JSON representation of next route query string"
        />
        <br />
        <input
          className="nextroute-go"
          type="button"
          value="Navigate to next route"
          onClick={this.navigateToRoute.bind(this)}
        />
        <br />
      </div>
    );
  }

  protected update(): void {
    const currentRoute = this.router.getRoute();
    this.setState({ currentRoute });

    const { query, parameter } = currentRoute;
    const redirect = query.redirect as string;
    const echo = query.echo as string;

    if (redirect) {
      const newUrl = this.router.linkTo(redirect);
      this.router.navigate(newUrl);
    }

    if (echo) {
      this.setState({ echo });
    }

    if (Object.getOwnPropertyNames(parameter).length > 0) {
      // only show the first key
      const key = Object.getOwnPropertyNames(parameter)[0];
      const value = parameter[key];
      this.setState({ echo: value });
    }
  }

  private updateNextRouteName = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ nextRouteName: ev.target.value });
  };

  private updateNextRouteParams = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ nextRouteParams: ev.target.value });
  };

  private updateNextRouteQuery = (ev: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ nextRouteQuery: ev.target.value });
  };

  private navigateToRoute() {
    const params = JSON.parse(this.state.nextRouteParams) || {};
    const query = JSON.parse(this.state.nextRouteQuery) || {};
    const name = this.state.nextRouteName;

    const url = this.router.linkTo(name, params, query);
    this.router.navigate(url);
  }
}

export default withInject(NavigationRemote);
