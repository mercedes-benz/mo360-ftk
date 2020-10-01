// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import * as React from 'react';
import { IDiContainer, IDiContext, ITranslationMap } from '..';
import { getDefaultAssetResolver } from '../componentLoader/lib/assetResolver';
import ComponentLoader from '../componentLoader/lib/ComponentLoader';
import { EventEmitter } from '../interconnection/EventEmitter';
import { InterconnectionService } from '../interconnection/InterconnectionService';
import IRouteConfig from '../router/component/interface/IRouteConfig';
import DefaultRouterStrategy from '../router/lib/urlFormatStrategy/DefaultRouterStrategy';
import serviceIds from './serviceIds';

function registerDefaultDependencies(container: IDiContainer, name: string) {
  container.bind(serviceIds.name).toConstantValue(name);
  container.bind(serviceIds.currentSwidget.isHotLoaded).toConstantValue(false);
  container.bind(serviceIds.currentSwidget.uniqueId).toConstantValue('');

  /** swidget loader  */
  container.bind(ComponentLoader).toConstantValue(new ComponentLoader());

  /** router */
  container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue([
    {
      /* eslint-disable react/display-name */
      component: () => <h1>Hello World</h1>,
      /* eslint-enable react/display-name */
      name: 'home',
      pattern: '/',
    },
  ]);

  container.bind(serviceIds.routerUrlFormatStrategy).toDynamicValue(() => {
    return new DefaultRouterStrategy(null, null);
  });

  /** start with empty translations */
  container.bind<ITranslationMap>(serviceIds.translations).toConstantValue({});

  /** interconnection */
  container.bind(EventEmitter).toConstantValue(new EventEmitter());
  container.bind(InterconnectionService).toDynamicValue((diContext: IDiContext) => {
    const appName = diContext.container.get<string>(serviceIds.name);
    const isHotLoaded = diContext.container.get<boolean>(serviceIds.currentSwidget.isHotLoaded);
    const eventEmitter = diContext.container.get(EventEmitter);
    return new InterconnectionService(appName, isHotLoaded, eventEmitter);
  });

  /** asset resolver */
  const url: URL = new URL(window.location.href) as any;
  container.bind(serviceIds.currentSwidget.url).toConstantValue(url);
  container.bind(serviceIds.currentSwidget.assetResolver).toConstantValue(getDefaultAssetResolver(url));
}

registerDefaultDependencies.displayName = 'registerDefaultDependencies';

export default registerDefaultDependencies;
