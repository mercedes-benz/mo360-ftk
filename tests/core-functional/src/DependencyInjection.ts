// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { navigateToPath, useTestComponent } from './Common';

describe('Dependency Injection', () => {
  beforeAll(() => {
    useTestComponent('DependencyInjection');
  });

  it('should only find a single instance of a singleton component', () => {
    navigateToPath('/#!/singleton');
    expect($$('.singleton').length).toEqual(1);
  });

  it('should be possible to nest kernels', () => {
    navigateToPath('/#!/nested');
    $('.nested').waitForExist();
    expect($$('.nested').length).toEqual(5);
  });

  it('should be possible to create child DI containers using <ChildContainer>', () => {
    navigateToPath('/#!/containercontext');
    $('.alldifferent').waitForExist();
    expect($('.alldifferent').getText()).toEqual('true');
    expect($('.parentaccess').getText()).toEqual('true');
    expect($('.overwriteparent').getText()).toEqual('true');
  });

  it('should be possible to overwrite a hosts dependency', () => {
    navigateToPath('/#!/depoverwrite');
    $('.nested').waitForExist();
    expect($('.nested').getText()).toEqual('nested');
  });

  it('should make sure a nested kernel can access the dependencies from the parent', () => {
    navigateToPath('/#!/nestedkerneldeps');
    $('.nested').waitForExist();
    expect($('.nested').getText()).toEqual('hostcontainer');
  });
});
