// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import IUrlQueryMap from '../../interface/IUrlQueryMap';

/**
 * @interface IUrlStrategy
 */
interface IUrlStrategy {
  /**
   * @param url
   * @returns {string[]}
   */
  extractPath(url: string): string[];

  /**
   * @param segments
   * @returns {string}
   */
  buildPathFromSegments(segments: string[]): string;

  /**
   * @param url
   * @returns {string}
   */
  extractHashbang(url: string): string;

  /**
   * @param hash
   * @returns {string}
   */
  buildHashbang(hash: string): string;

  /**
   * @param url
   * @returns {IUrlQueryMap}
   */
  extractQuery(url: string): IUrlQueryMap;

  /**
   * @param params
   * @returns {string}
   */
  buildQueryFromParameters(params: IUrlQueryMap): string;
}

export default IUrlStrategy;
