// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { interfaces } from 'inversify';
import * as React from 'react';
import { IDiContainer } from '..';
import { ConfigService } from '../config/lib/ConfigService';
import { diContext } from '../di/lib/diContext';
import { ErrorHandler } from '../errorHandler/lib/ErrorHandler';
import { I18nService } from '../i18n/lib/I18nService';
import { InterconnectionService } from '../interconnection/InterconnectionService';
import serviceIds from '../core/serviceIds';
import RouterServiceType from '../router/lib/RouterService.type';

export function useFromDi<T>(serviceId: string | symbol | interfaces.Newable<T>): T {
  const diContainer = React.useContext<IDiContainer>(diContext);

  if (!diContainer.isBound(serviceId)) {
    throw new Error(
      `Could not inject ${serviceId.toString()} as it is currently not bound in this scope. Are you missing a Provider?`,
    );
  }
  return diContainer.get<T>(serviceId);
}

export const useConfig = () => useFromDi(ConfigService);
export const useDi: () => IDiContainer = () => React.useContext(diContext);
export const useErrorHandler = () => useFromDi(ErrorHandler);
export const useI18n = () => useFromDi(I18nService);
export const useInterconnection = () => useFromDi(InterconnectionService);
export const useRouter = () => useFromDi<RouterServiceType>(serviceIds.routerService);

/**
 * Compat/shim for backwards compatibility when using Hooks API.
 * @deprecated
 */
export function withFtk<TProps extends {}>(
  InnerComponent: React.ComponentType<TProps>,
): React.ComponentType<TProps> {
  return InnerComponent;
}
