// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { interfaces } from 'inversify';
import { IDiContainer } from '../..';

/**
 * Walks up a container hierarchy until the container that originally bound a
 * dependency is found. This is especially usefull for .rebind() and .unbind() as
 * those have to be performed on the container originally used to .bind() a dependency.
 */
export function findBoundContainer(
  container: IDiContainer,
  serviceId: string | symbol | interfaces.Newable<{}>,
): IDiContainer {
  if (!container.isBound(serviceId) || !container.parent) {
    throw new Error(`Identifier ${serviceId.toString()} not bound in container hierarchy!`);
  }
  if (container.parent.isBound(serviceId) === false) {
    return container;
  } else {
    return findBoundContainer(container.parent, serviceId);
  }
}
