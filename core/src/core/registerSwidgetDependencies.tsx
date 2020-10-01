// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { IDiContainer, IDiContext } from '..';
import { RouterService } from '../router/lib/RouterService';
import NestedRouterStrategy from '../router/lib/urlFormatStrategy/NestedRouterStrategy';
import serviceIds from './serviceIds';

/**
 * A swidget is mounted in a react subtree of the host WebApp and uses the DI container hierarchy
 * of the host. Thus, most dependencies are already registered and we only need to overwrite some
 * dependencies/values unique to the swidget.
 */
function registerSwidgetDependencies(container: IDiContainer, swidgetName: string) {
  container.bind(serviceIds.name).toConstantValue(swidgetName);
  container.bind(serviceIds.currentSwidget.isHotLoaded).toConstantValue(true);

  container.bind(serviceIds.routerUrlFormatStrategy).toDynamicValue((diContext: IDiContext) => {
    const router = diContext.container.get<RouterService>(RouterService);

    // we will only have a uniqueId if we were loaded via the <SwidgetLoader /> component!
    const uniqueId = diContext.container.isBound(serviceIds.currentSwidget.uniqueId)
      ? diContext.container.get<string>(serviceIds.currentSwidget.uniqueId)
      : '';

    return new NestedRouterStrategy(`${router.getRoute().name}_${name}${uniqueId}`, router.getRoute().url);
  });
}

export default registerSwidgetDependencies;
