// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import IUrlUtil from './interface/IUrlUtil';
import IUrlStrategy from './strategy/interface/IUrlStrategy';

/**
 * @class Url
 * @implements IUrl
 */
class Url implements IUrlUtil {
  /**
   * @type {IUrlStrategy}
   */
  public strategy: IUrlStrategy;

  /**
   * @constructor
   * @param {IUrlStrategy} strategy
   */
  constructor(strategy: IUrlStrategy) {
    this.strategy = strategy;
  }

  /**
   * @param url
   * @returns {string[]}
   */
  public extractPath(url: string): string[] {
    return this.strategy.extractPath(url);
  }

  /**
   * @param segments
   * @returns {string}
   */
  public buildPathFromSegments(segments: string[]): string {
    return this.strategy.buildPathFromSegments(segments);
  }

  /**
   * @param url
   * @returns {string}
   */
  public extractHashbang(url: string): string {
    return this.strategy.extractHashbang(url);
  }

  /**
   * @param hash
   * @returns {string}
   */
  public buildHashbang(hash: string): string {
    return this.strategy.buildHashbang(hash);
  }

  /**
   * @param url
   * @returns {any}
   */
  public extractQuery(url: string): any {
    return this.strategy.extractQuery(url);
  }

  /**
   * @returns {string}
   */
  public buildQueryFromParameters(params: any = {}): string {
    return this.strategy.buildQueryFromParameters(params);
  }
}

export default Url;
