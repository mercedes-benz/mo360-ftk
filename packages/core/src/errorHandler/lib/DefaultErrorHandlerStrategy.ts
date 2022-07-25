// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import IErrorHandlerStrategy from './interface/IErrorHandlerStrategy';

export class DefaultErrorHandlerStrategy implements IErrorHandlerStrategy {
  /**
   * @param message
   * @param stacktrace
   * @return void
   */
  public handleError(message: string, stacktrace: string): void {
    // tslint:disable-next-line
    console.log('[Error Handler] ' + message, stacktrace);
  }
}
