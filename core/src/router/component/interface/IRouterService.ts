// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import IRoute from './IRoute';

interface IRouterService {
  getRoute(): IRoute;
  navigate(url: string): void;
  navigateToHome(): void;
  linkTo(name: string, parameter?: any, query?: any): string;
  linkToHome(): string;
}

export default IRouterService;
