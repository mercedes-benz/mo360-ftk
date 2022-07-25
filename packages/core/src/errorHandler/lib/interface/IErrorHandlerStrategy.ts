// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

interface IErrorHandlerStrategy {
  handleError(message: string, stacktrace: string): void
}

export default IErrorHandlerStrategy;
