// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { isUndefined, keys } from 'lodash';

/**
 * @class Registry
 */
export class Registry<T> {
  /**
   * @protected
   * @type {*}
   */
  protected keyValueMap: any;

  /**
   * @protected
   * @type {number}
   */
  protected keyCount: number;

  /**
   * @constructor
   */
  constructor() {
    this.keyValueMap = {};
    this.keyCount = 0;
  }

  /**
   * @param id
   * @param data
   * @returns {Registry}
   */
  public add(id: string, data: T): string {
    if (this.has(id) === false) {
      this.keyCount++;
    }

    this.keyValueMap[id] = data;

    return id;
  }

  /**
   * @param id
   * @returns {Registry}
   */
  public remove(id: string): Registry<T> {
    if (isUndefined(this.keyValueMap[id])) {
      throw new Error(`Registry: Unknown id ${id}.`);
    }

    delete this.keyValueMap[id];
    this.keyCount--;

    return this;
  }

  /**
   * @param id
   * @returns {object}
   */
  public get(id: string): T {
    if (isUndefined(this.keyValueMap[id])) {
      throw new Error(`Registry: Unknown id ${id}.`);
    }

    return this.keyValueMap[id];
  }

  /**
   * @param {(value: T, index: string) => void} callback
   */
  public forEach(callback: (value: T, index: string) => void) {
    keys(this.keyValueMap).map((key) => {
      callback(this.get(key), key);
    });
  }

  /**
   * @param id
   * @returns {boolean}
   */
  public has(id: string): boolean {
    return !isUndefined(this.keyValueMap[id]);
  }

  /**
   * @returns {Registry}
   */
  public clear(): Registry<T> {
    this.keyValueMap = {};
    this.keyCount = 0;

    return this;
  }

  /**
   * @returns {number}
   */
  public getCount(): number {
    return this.keyCount;
  }

  /**
   * @returns {string[]}
   */
  public getKeys(): string[] {
    return keys(this.keyValueMap);
  }
}
export default Registry;
