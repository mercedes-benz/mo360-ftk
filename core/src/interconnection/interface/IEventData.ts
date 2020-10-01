// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

/**
 * @template TData
 * @interface IEventData
 */
interface IEventData<TData> {
  /**
   * @type {string}
   */
  publisherName: string;

  /**
   * @type {TData}
   */
  data: TData;

  /**
   * @type {boolean}
   */
  isPublisherHotLoaded: boolean;
}

export default IEventData;
