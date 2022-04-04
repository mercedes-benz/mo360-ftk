// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { Container } from 'inversify';
import { once } from 'lodash';
import * as React from 'react';
import { IConfigData, IDiContainer } from '..';
import { ConfigProvider } from '../config/component/Provider';
import { diContext } from '../di/lib/diContext';
import ErrorHandlerProvider from '../errorHandler/component/Provider';
import I18nProvider from '../i18n/component/IntlProviderWrapper';
import registerDefaultDependencies from './registerDefaultDependencies';
import registerSwidgetDependencies from './registerSwidgetDependencies';
import serviceIds from './serviceIds';

export interface IAppProps {
  /**
   * A name for the app. This is i.e. used in interconnection where we communicate between
   * different nested Apps ("swidgets") and can use the name to determine the
   * sending/receiving swidget.
   */
  name: string;

  /**
   * We allow an init function to be passed. The passed container already contains the default
   * dependencies in its parent container, so those can be overridden.
   */
  init?: (container: IDiContainer) => void | IDiContainer;

  /**
   * Configuration to be passed. If non is given, the default configuration will be used.
   * If given, the default configuration will be merged with the given configuration object
   * using lodash's recursive merge(). If the App is loaded as a swidget, the
   * configuration from the parent host will be merged with the given config object.
   */
  config?: IConfigData;
}

/**
 * Main entry point to a WebApp. Binds a new dependency injection container to all children,
 * and sets up some default dependencies.
 *
 * This is a replacement for the previous "kernel" function.
 */
export class App extends React.Component<IAppProps, {}> {
  private setup = once((containerFromContext: IDiContainer | null) => {
    const isHotLoaded = containerFromContext !== null;

    const defaultContainer = new Container();
    const appContainer = defaultContainer.createChild();

    if (!isHotLoaded) {
      registerDefaultDependencies(defaultContainer, this.props.name);
    } else {
      defaultContainer.parent = containerFromContext;
      registerSwidgetDependencies(defaultContainer, this.props.name);
    }

    this.useChildrenAsDefaultRouteIfNotSet(defaultContainer);

    if (this.props.init) {
      const custom = this.props.init(appContainer);
      // LEGACY: we need this as the container passed to kernel() in the init func
      // returns a custom container - this should not be done in new apps and is deprecated
      if (custom && custom !== appContainer) {
        return custom;
      }
    }
    return appContainer;
  });

  public render() {
    return (
      <diContext.Consumer>
        {(containerFromContext) => {
          const container = this.setup(containerFromContext);
          return (
            <diContext.Provider value={container}>
              <ConfigProvider config={this.props.config}>
                <ErrorHandlerProvider>
                  <I18nProvider>{this.props.children}</I18nProvider>
                </ErrorHandlerProvider>
              </ConfigProvider>
            </diContext.Provider>
          );
        }}
      </diContext.Consumer>
    );
  }

  /**
   * When a swidget does not register routes, we use its children as default route
   */
  private useChildrenAsDefaultRouteIfNotSet = (container: IDiContainer) => {
    container.bind(serviceIds.routes).toDynamicValue(() => [
      {
        component: this.props.children,
        name: 'home',
        pattern: '/',
      },
    ]);
  };
}
