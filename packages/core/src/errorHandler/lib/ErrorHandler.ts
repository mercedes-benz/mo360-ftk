// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import IErrorHandlerStrategy from './interface/IErrorHandlerStrategy';

export class ErrorHandler {
  protected strategy: IErrorHandlerStrategy;

  constructor(strategy: IErrorHandlerStrategy) {
    this.strategy = strategy
  }

  /**
   * @param message
   * @param stacktrace
   * @return void
   */
  public handleError(message: string, stacktrace: string): void {
    this.strategy.handleError(message, stacktrace)
  }
}
