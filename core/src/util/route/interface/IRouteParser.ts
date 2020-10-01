// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

export interface IRouteParser {
  getRouteString: () => string;
  match(path: string): object | boolean;
  createPathString(parameter: any): string;
}
