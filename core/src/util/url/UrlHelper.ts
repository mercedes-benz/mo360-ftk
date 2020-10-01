// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import IUrlHelper from './interface/IUrlHelper';
import IUrlQueryMap from './interface/IUrlQueryMap';

/**
 * URLHelper class for working with URLs. It contains methods for working with parameters and queries.
 * URLHelper uses ES6 URL API (https://developer.mozilla.org/en-US/docs/Web/API/URL/URL, https://url.spec.whatwg.org/#constructors),
 * which is a URL object (created by new URL) representing the URL defined by the parameters.
 */
class UrlHelper implements IUrlHelper {
  private url: URL;

  constructor(url = '', base: string = window.location.origin) {
    this.url = new URL(url, base);
  }

  public getHref = (): string => {
    return this.url.href;
  };

  public getPath = (): string => {
    const urlObj = this.url;
    return urlObj.pathname;
  };

  public getOrigin = (): string => {
    return this.url.origin;
  };

  public getSegments = (): string[] => {
    const path = this.url.pathname;
    return path.split('/');
  };

  public setSegmentsToString = (segments: string[]): string => {
    return segments.join('/');
  };

  public extractHash = (): string => {
    return this.url.hash.replace('#!', '');
  };

  public getQueryMap = (): IUrlQueryMap => {
    const urlObj = this.url;
    const searchObj: { [key: string]: string | string[] } = {};

    urlObj.searchParams.forEach((value: string, key: string) => {
      const valueArr = urlObj.searchParams.getAll(key);

      if (valueArr && valueArr.length) {
        searchObj[key] = valueArr.length > 1 ? valueArr : valueArr[0];
      }
    });

    return searchObj;
  };

  public setQueryString = (queryObject: any = {}): string => {
    const urlObj = this.url;

    for (const key in queryObject) {
      if (Object.prototype.hasOwnProperty.call(queryObject, key)) {
        typeof queryObject[key] === 'object'
          ? queryObject[key].forEach((element: string) => {
              urlObj.searchParams.append(key, element);
            })
          : urlObj.searchParams.append(key, queryObject[key]);
      }
    }

    return urlObj.search;
  };
}

export default UrlHelper;
