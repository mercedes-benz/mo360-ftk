// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import * as React from 'react';
import { IDiContainer, IDiContext, ITranslationMap } from '..';
import { getDefaultAssetResolver } from '../componentLoader/lib/assetResolver';
import ComponentLoader from '../componentLoader/lib/ComponentLoader';
import { EventEmitter } from '../interconnection/EventEmitter';
import { InterconnectionService } from '../interconnection/InterconnectionService';
import serviceIds from './serviceIds';
import RouteConfigType from '../router/lib/RouteConfig.type';
import Hashbang from '../router/lib/serializeRouteInUrlStrategy/Hashbang';

function registerDefaultDependencies(container: IDiContainer, name: string) {
  container.bind(serviceIds.name).toConstantValue(name);
  container.bind(serviceIds.currentSwidget.isHotLoaded).toConstantValue(false);
  container.bind(serviceIds.currentSwidget.uniqueId).toConstantValue('');

  /** swidget loader  */
  container.bind(ComponentLoader).toConstantValue(new ComponentLoader());

  /** router */
  container.bind<RouteConfigType>(serviceIds.routes).toConstantValue([
    {
      name: 'home',
      path: '',
      action: () => {
        // eslint-disable-next-line react/display-name
        return () => <h1>Hello World</h1>;
      },
    },
  ]);

  container.bind(serviceIds.routerSerializeRouteInUrlStrategy).toConstantValue(new Hashbang());

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
