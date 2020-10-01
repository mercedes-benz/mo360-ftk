// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { navigateToPath, useTestComponent } from './Common';

function getPathData(swidgetId: string | undefined) {
  const json: string = swidgetId
    ? browser.$(`.${swidgetId} .asset-data`).getText()
    : browser.$$(`.asset-data`)[0].getText();

  return JSON.parse(json);
}

describe('ComponentLoader asset loading/resolving', () => {
  beforeAll(() => {
    useTestComponent('ComponentLoader');
    navigateToPath('/#!/assets/');
    $('.swidget1').waitForExist();
    $('.swidget2').waitForExist();
    $('.swidget3').waitForExist();
  });

  it('loads correct pathes for the host', () => {
    const data = getPathData(undefined);
    expect(data.absolutePath).toBe('http://componentloader.localtest.me:8080/images/image.jpeg');
    expect(data.differentOrigin).toBe('http://example.com/nested/image.jpeg');
    expect(data.doubleParentPath).toBe('http://componentloader.localtest.me:8080/image.jpeg');
    expect(data.parentPath).toBe('http://componentloader.localtest.me:8080/image.jpeg');
    expect(data.relativePath).toBe('http://componentloader.localtest.me:8080/image.jpeg');
  });

  it('loads correct pathes for swidget on same origin and root folder', () => {
    const data = getPathData('swidget1');
    expect(data.absolutePath).toBe('http://swidgets.localtest.me:8081/images/image.jpeg');
    expect(data.differentOrigin).toBe('http://example.com/nested/image.jpeg');
    expect(data.doubleParentPath).toBe('http://swidgets.localtest.me:8081/image.jpeg');
    expect(data.parentPath).toBe('http://swidgets.localtest.me:8081/image.jpeg');
    expect(data.relativePath).toBe('http://swidgets.localtest.me:8081/image.jpeg');
  });

  it('loads correct pathes for swidget on same origin first subfolder', () => {
    const data = getPathData('swidget2');
    expect(data.absolutePath).toBe('http://swidgets.localtest.me:8081/images/image.jpeg');
    expect(data.differentOrigin).toBe('http://example.com/nested/image.jpeg');
    expect(data.doubleParentPath).toBe('http://swidgets.localtest.me:8081/image.jpeg');
    expect(data.parentPath).toBe('http://swidgets.localtest.me:8081/image.jpeg');
    expect(data.relativePath).toBe('http://swidgets.localtest.me:8081/somewhere/image.jpeg');
  });

  it('loads correct pathes for swidget on same origin second subfolder', () => {
    const data = getPathData('swidget3');
    expect(data.absolutePath).toBe('http://swidgets.localtest.me:8081/images/image.jpeg');
    expect(data.differentOrigin).toBe('http://example.com/nested/image.jpeg');
    expect(data.doubleParentPath).toBe('http://swidgets.localtest.me:8081/image.jpeg');
    expect(data.parentPath).toBe('http://swidgets.localtest.me:8081/somewhere/image.jpeg');
    expect(data.relativePath).toBe('http://swidgets.localtest.me:8081/somewhere/deep/image.jpeg');
  });
});
