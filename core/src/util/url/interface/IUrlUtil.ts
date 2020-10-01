// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import IUrlStrategy from '../strategy/interface/IUrlStrategy';

/**
 * @interface IUrl
 */
interface IUrl extends IUrlStrategy {
  strategy: IUrlStrategy;
}

export default IUrl;
