// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { inject, RouterService, withInject } from '@daimler/ftk-core';
import * as React from 'react';

class MountComponent extends React.Component<{}, {}> {
  @inject()
  private Router!: RouterService;

  private textRandom: string;

  public constructor(props: {}) {
    super(props);
    this.textRandom = this.generateRandomString(24);
  }

  public render() {
    const { query, parameter } = this.Router.getRoute();

    let textParam = '';
    if (Object.getOwnPropertyNames(parameter).length > 0) {
      // only show the first key
      const key = Object.getOwnPropertyNames(parameter)[0];
      textParam = parameter[key];
    }

    let textQuery = '';
    if (Object.prototype.hasOwnProperty.call(query, 'info')) {
      textQuery = query.info as string;
    }

    return (
      <React.Fragment>
        <div className="router-test-mount-component">Mount Component</div>
        <div className="text-random">{this.textRandom}</div>
        <div className="text-param">{textParam}</div>
        <div className="text-query">{textQuery}</div>
      </React.Fragment>
    );
  }

  private generateRandomString(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

export default withInject(MountComponent);
