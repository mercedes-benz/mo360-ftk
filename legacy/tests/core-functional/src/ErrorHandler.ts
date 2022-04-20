// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { useTestComponent } from './Common';

describe('ErrorHandler', () => {
  beforeAll(() => {
    useTestComponent('ErrorHandler');
  });

  it('should catch a broken component', () => {
    $('.test-wrapper').waitForExist();
    expect($('.test-valid').getText()).toEqual('Hello World!');
    $('.test-toggle').click();

    expect($('.test-error').getText()).toContain('Broken Component!');
    expect($('.test-valid').isExisting()).toBeFalsy();
  });
});
