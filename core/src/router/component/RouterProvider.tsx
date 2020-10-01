// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import * as React from 'react';
import Route from './Route';

/**
 * Compat/shim for backwards compatibility when using <RouterProvider />.
 * @deprecated Use <Route> instead
 */
export default function RouterProvider() {
  console.warn(`<RouterProvider /> is deprecated. Use <Route /> instead.`);
  return <Route />;
}
