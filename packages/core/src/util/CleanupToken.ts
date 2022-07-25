// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

export class CleanupToken {
  private cleanupFunctions: any[] = [];
  private finished = false;

  public add(cleanupFunction: (...args: any[]) => void) {
    if (this.finished === true) {
      throw new Error('cleanup already called');
    } else {
      this.cleanupFunctions.push(cleanupFunction);
    }
  }

  public cleanup() {
    if (this.finished) {
      throw new Error('cleanup already called');
    } else {
      this.finished = true;
      this.cleanupFunctions.map((fn) => {
        fn(undefined);
      });
    }
  }
}
