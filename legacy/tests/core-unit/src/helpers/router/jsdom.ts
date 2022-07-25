// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { JSDOM } from 'jsdom';

export const setGlobalDomObjects = (url = 'http://localhost:8082/#!/') => {
  const dom: JSDOM = new JSDOM('<html><body></body></html>', { url });
  global.document = dom.window.document;
  global.window = dom.window;
  global.navigator = dom.window.navigator;
};
