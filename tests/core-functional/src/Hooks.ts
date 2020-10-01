// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { useTestComponent } from './Common';

describe('Hooks', () => {
  beforeAll(() => {
    useTestComponent('Hooks');
  });

  it('should render a Component that uses FTK Core APIs via Hooks', (done) => {
    $('.config').waitForExist();
    $('.route').waitForExist();
    browser.call(done as any);
  });
});
