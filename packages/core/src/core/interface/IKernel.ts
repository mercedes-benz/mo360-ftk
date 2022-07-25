// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { IDiContainer } from '../..';
import serviceIds from '../serviceIds';

/**
 * @interface IKernel
 */
interface IKernel {
  /**
   * @type {typeof serviceIds}
   */
  serviceIds: typeof serviceIds;

  getContainer(): IDiContainer;
}

export default IKernel;
