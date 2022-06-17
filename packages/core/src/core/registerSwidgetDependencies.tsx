// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { IDiContainer, IDiContext } from '..';
import serviceIds from './serviceIds';
import RouterServiceType from '../router/lib/RouterService.type';
import QueryString from '../router/lib/serializeRouteInUrlStrategy/QueryString';

/**
 * A swidget is mounted in a react subtree of the host WebApp and uses the DI container hierarchy
 * of the host. Thus, most dependencies are already registered and we only need to overwrite some
 * dependencies/values unique to the swidget.
 */
function registerSwidgetDependencies(container: IDiContainer, swidgetName: string) {
  container.bind(serviceIds.name).toConstantValue(swidgetName);
  container.bind(serviceIds.currentSwidget.isHotLoaded).toConstantValue(true);

  container.bind(serviceIds.routerSerializeRouteInUrlStrategy).toDynamicValue((diContext: IDiContext) => {
    const router = diContext.container.get<RouterServiceType>(serviceIds.routerService);

    // we will only have a uniqueId if we were loaded via the <SwidgetLoader /> component!
    const uniqueId = diContext.container.isBound(serviceIds.currentSwidget.uniqueId)
      ? diContext.container.get<string>(serviceIds.currentSwidget.uniqueId)
      : '';

    return new QueryString(`${router.getRoute().name}_${swidgetName}_${uniqueId}`);
  });
}

export default registerSwidgetDependencies;
