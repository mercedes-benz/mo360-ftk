// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

let currentComponentName: string;
let currentBaseUrl: string;

/**
 * In order for the test hardness to know which component to setup, we need to
 * pass the name of that (registered) component. We do this by encoding it into
 * the first segment of the hostname *.localtest.me:
 *
 * for example: http://componentloader.localtest.me:8080/
 *
 * *.localtest.me resolves to 127.0.0.1 so this will work
 *
 * Hint:
 * If *.loacaltest.me doesn't resolve (because of a corporate proxy)
 * then try adding localtest.me to your hosts and add a proxy rule for it.
 */
export const useTestComponent = (componentName: string) => {
  currentComponentName = componentName;
  currentBaseUrl = `http://${currentComponentName}.localtest.me:8080`;
  return browser.url(currentBaseUrl);
};

export const navigateToPath = (path: string) => {
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  const url = `${currentBaseUrl}${path}`;
  return browser.url(url);
};
