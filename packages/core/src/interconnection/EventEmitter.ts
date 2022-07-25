// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { EventEmitter as VendorEventEmitter } from 'eventemitter3';

export class EventEmitter {
  private eventEmitter = new VendorEventEmitter();

  public subscribe<TData>(event: string, callback: (data: TData) => void): () => void {
    this.eventEmitter.addListener(event, callback);

    return () => {
      this.eventEmitter.removeListener(event, callback);
    };
  }

  public publish<TData>(event: string, data: TData): void {
    this.eventEmitter.emit(event, data);
  }
}
