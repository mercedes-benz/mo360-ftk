// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { useTestComponent } from './Common';

describe('Interconnect', () => {
  beforeAll(() => {
    useTestComponent('Interconnect');
  });

  it('should subscribe and publish bidirectional', (done) => {
    expect($('.test-host .test-events').getText().length).toBe(0);
    expect($('.test-hotloaded .test-events').getText().length).toBe(0);

    $('.test-host .test-button').click();

    expect($('.test-host .test-events').getText()).toContain(
      '{"data":"bar","isPublisherHotLoaded":false,"publisherName":"host"}',
    );

    expect($('.test-hotloaded .test-events').getText()).toContain(
      '{"data":"bar","isPublisherHotLoaded":false,"publisherName":"host"}',
    );

    $('.test-hotloaded .test-button').click();

    expect($('.test-host .test-events').getText()).toContain(
      '{"data":"bar","isPublisherHotLoaded":true,"publisherName":"hotloaded"}',
    );

    expect($('.test-hotloaded .test-events').getText()).toContain(
      '{"data":"bar","isPublisherHotLoaded":true,"publisherName":"hotloaded"}',
    );

    browser.call(done as any);
  });
});
