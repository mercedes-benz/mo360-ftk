// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { once } from 'lodash';
import * as React from 'react';
import serviceIds from '../../core/serviceIds';
import BindToDi from '../../di/component/BindToDi';
import inject from '../../di/hoc/inject';
import { ISwidget } from '../ISwidget';
import { getDefaultAssetResolver } from '../lib/assetResolver';
import ComponentLoader from '../lib/ComponentLoader';
import withInject from '../../di/hoc/withInject';

export interface DeprecatedSwidgetLoaderProps {
  name: string;
  errorFallback?: (error: Error) => React.ReactNode;
  loadingPlaceholder?: React.ReactNode;
  url: string;
  props?: object;
  uniqueId: string;
}

export interface IState {
  swidget?: ISwidget;
  fallbackComponent?: React.ReactNode;
}

class DeprecatedSwidgetLoader extends React.Component<DeprecatedSwidgetLoaderProps, IState> {
  public state: IState = {};

  public prerenderSetup = once(() => {
    const { name, url } = this.props;
    return this.componentLoader
      .load({ name, url })
      .then((swidget) => {
        this.setState({ swidget });
      })
      .catch((err: Error) => {
        this.handleError(err);
      });
  });

  @inject() private componentLoader: ComponentLoader;

  public componentDidMount() {
    console.info('Using the classic SwidgetLoader is deprecated, we recommend using webpack-module-federation.');
  }

  public render() {
    // this will produce a warning in dev mode that we should not update state in render()
    // however there is no way around in currently?
    this.prerenderSetup();
    if (this.state.fallbackComponent) {
      return this.state.fallbackComponent;
    } else if (!this.state.swidget) {
      return this.props.loadingPlaceholder || null;
    }
    const Swidget = this.state.swidget;

    const baseUrl = window.location.href;
    const url: URL = new URL(this.props.url, baseUrl) as any;

    return (
      <BindToDi
        services={(container) => {
          container.bind(serviceIds.currentSwidget.url).toConstantValue(url);
          container.bind(serviceIds.currentSwidget.assetResolver).toConstantValue(getDefaultAssetResolver(url));
          container.bind(serviceIds.currentSwidget.uniqueId).toConstantValue(this.props.uniqueId);
        }}
      >
        <Swidget {...this.props.props} />
      </BindToDi>
    );
  }

  private handleError = (error: Error) => {
    if (typeof this.props.errorFallback === 'function') {
      const fallbackComponent = this.props.errorFallback(error);
      this.setState({ fallbackComponent });
    } else {
      this.setState({ fallbackComponent: `Error loading Swidget: ${error.toString()}` });
    }
  };
}

export default withInject(DeprecatedSwidgetLoader);
