// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import * as React from 'react';

/**
 * @interface IRouteConfig
 */
interface IRouteConfig {
  /**
   * @type {string}
   */
  name: string;

  /**
   * @type {string}
   *
   * e.g. '/test3/:paramId', with optional parameter '/test3/:paramId?'
   */
  pattern: string;

  /**
   * @type {React.ComponentType<any>}
   */
  component: React.ComponentType<any>;

  /**
   * @type {boolean}
   */
  forceRemount?: boolean;
}

export default IRouteConfig;
