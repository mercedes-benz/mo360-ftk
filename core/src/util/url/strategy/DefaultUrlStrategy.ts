// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import UrlHelper from '../UrlHelper';
import IUrlStrategy from './interface/IUrlStrategy';
import IUrlQueryMap from '../interface/IUrlQueryMap';

/**
 * @class Default
 */
class DefaultUrlStrategy implements IUrlStrategy {
  /**
   * @param url
   * @returns {string[]}
   */
  public extractPath(url: string): string[] {
    return new UrlHelper(url).getSegments().filter((segment) => {
      return segment.length > 0;
    });
  }

  /**
   * @param segments
   * @returns {string}
   */
  public buildPathFromSegments(segments: string[]): string {
    let buffer = new UrlHelper().setSegmentsToString(segments);

    if (buffer.substr(0, 1) !== '/') {
      buffer = '/' + buffer;
    }

    return decodeURIComponent(buffer);
  }

  /**
   * @param url
   * @returns {string}
   */
  public extractHashbang(url: string): string {
    return new UrlHelper(url).extractHash();
  }

  /**
   * @param hash
   * @returns {string}
   */
  public buildHashbang(hash: string): string {
    return '#!' + hash;
  }

  /**
   * @param url
   * @returns {IUrlQueryMap}
   */
  public extractQuery(url: string): IUrlQueryMap {
    return new UrlHelper(url).getQueryMap();
  }

  /**
   * @returns {string}
   */
  public buildQueryFromParameters(params: IUrlQueryMap = {}): string {
    return new UrlHelper().setQueryString(params);
  }
}

export default DefaultUrlStrategy;
