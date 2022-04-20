// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { IConfigData } from '@daimler/ftk-core';
import { useTestComponent } from './Common';

describe('Configuration', () => {
  beforeAll(() => {
    useTestComponent('Configuration');
  });

  it('should be able to read a configuration object', () => {
    $('.config-json').waitForExist();
    const text = $('.config-json').getText().toString();
    const config: IConfigData<any, any> = JSON.parse(text);
    expect(config.core).toBeDefined();
    expect(config.project).toBeDefined();
    expect(config.project.prop1).toEqual('value1');
    expect(config.project.prop2).toEqual('value2');
  });
});
