// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { navigateToPath, useTestComponent } from './Common';
describe('ComponentLoader', () => {
  it('should load an external component', (done) => {
    useTestComponent('ComponentLoader');
    $('.external-component-echo').waitForExist();
    expect($('.external-component-echo').getText()).toEqual('Foobar');

    browser.call(done as any);
  });

  it('should load an external component that wraps children', (done) => {
    useTestComponent('ComponentLoaderWithChildren');
    $('.external-component-child').waitForExist();

    expect($('.external-component-child').getText()).toEqual('Foobar');

    browser.call(done as any);
  });

  it('should be possible to pass props to a Swidget when loaded', () => {
    useTestComponent('ComponentLoader');
    navigateToPath('/#!/exampleswidget/');
    $('.example-swidget-props').waitForExist();
    const obj = JSON.parse($('.example-swidget-props').getText());
    expect(obj.prop1).toEqual('foo');
    expect(obj.prop2).toEqual(42);
    expect(obj.prop3.key1).toEqual('value1');
  });

  it('should use a swidgets children components if the swidget does not register routes ', () => {
    useTestComponent('ComponentLoader');
    navigateToPath('/#!/exampleswidgetchildren/');
    $('.example-swidget-children').waitForExist();
    expect(true).toEqual(true);
  });

  it('should call the errorFallback handler and render the returned fallback component on loading error', () => {
    useTestComponent('ComponentLoader');
    navigateToPath('/#!/fallback');
    $('.fallback').waitForExist();
    expect($('.fallback').getText().length).toBeGreaterThan(0);
  });

  it('should have a default error message if not fallback is set', () => {
    useTestComponent('ComponentLoader');
    navigateToPath('/#!/fallback');
    $('.default-fallback').waitForExist();
    expect($('.default-fallback').getText().length).toBeGreaterThan(0);
  });
});
