// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

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
