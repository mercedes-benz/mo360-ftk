// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import IUrlUtil from './url/interface/IUrlUtil';
import DefaultUrlStrategy from './url/strategy/DefaultUrlStrategy';
import UrlUtil from './url/UrlUtil';
import IUrlQueryMap from './url/interface/IUrlQueryMap';

const defaultStrategy = new DefaultUrlStrategy();
const util: IUrlUtil = new UrlUtil(defaultStrategy);

/**
 * @class Url
 * Proxy class to UrlUtil which use the default Url Strategy
 */
class Url {
  /**
   * @param url
   * @returns {string[]}
   */
  public static extractPath(url: string): string[] {
    return util.extractPath(url);
  }

  /**
   * @param segments
   * @returns {string}
   */
  public static buildPathFromSegments(segments: string[]): string {
    return util.buildPathFromSegments(segments);
  }

  /**
   * @param url
   * @returns {string}
   */
  public static extractHashbang(url: string): string {
    return util.extractHashbang(url);
  }

  /**
   * @param hash
   * @returns {string}
   */
  public static buildHashbang(hash: string): string {
    return util.buildHashbang(hash);
  }

  /**
   * @param url
   * @returns {IUrlQueryMap}
   */
  public static extractQuery(url: string): IUrlQueryMap {
    return util.extractQuery(url);
  }

  /**
   * @param params
   * @returns {string}
   */
  public static buildQueryFromParameters(params: IUrlQueryMap = {}): string {
    return util.buildQueryFromParameters(params);
  }
}

export default Url;
