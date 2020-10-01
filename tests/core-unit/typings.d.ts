// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

declare namespace NodeJS {
  interface Global {
    window: Window;
    navigator: Navigator;
    document: Document;
  }
}
