// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

declare namespace NodeJS {
  interface Global {
    window: Window;
    navigator: Navigator;
    document: Document;
  }
}
