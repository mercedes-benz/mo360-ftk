// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

/**
 * @interface IRoute
 */
interface IRoute {
  /**
   * @type {string}
   */
  name: string;

  /**
   * @type {string}
   */
  url: string;

  /**
   * @type {any}
   */
  query?: any;

  /**
   * @type {any}
   */
  parameter?: any;

  /**
   * @type {boolean}
   */
  forceRemount?: boolean;
}

export default IRoute;
