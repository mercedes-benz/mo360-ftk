// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { EventEmitter } from './EventEmitter';
import IEventData from './interface/IEventData';

export class InterconnectionService {
  private name: string;
  private isHotLoaded: boolean;
  private eventEmitter: EventEmitter;

  constructor(name: string, isHotLoaded: boolean, eventEmitter: EventEmitter) {
    this.name = name;
    this.isHotLoaded = isHotLoaded;
    this.eventEmitter = eventEmitter;
  }

  public subscribe<TData>(event: string, callback: (data: IEventData<TData>) => void): () => void {
    return this.eventEmitter.subscribe(event, callback);
  }

  public publish<TData>(event: string, data: TData): void {
    return this.eventEmitter.publish<IEventData<TData>>(event, {
      data,
      isPublisherHotLoaded: this.isHotLoaded,
      publisherName: this.name,
    });
  }
}
