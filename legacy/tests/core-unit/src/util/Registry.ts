// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import Registry from '@daimler/ftk-core/lib/util/Registry';

const MISSING_ITEM_ID = 'MISSING';
const ITEM_ID_1 = 'TEST_ID_1';
const ITEM_ID_2 = 'TEST_ID_2';
const ITEM_DATA_1 = {
  data: 'testData1',
};
const ITEM_DATA_2 = {
  data: 'testData2',
};

describe('util/Registry', () => {
  it('should initialize empty', () => {
    const registry = new Registry();
    expect(registry.getCount()).toEqual(0);
  });

  it('should add item', () => {
    const registry = new Registry();

    expect(registry.add(ITEM_ID_1, ITEM_DATA_1)).toEqual(ITEM_ID_1);

    expect(registry.has(ITEM_ID_1)).toBeTruthy();
    expect(registry.get(ITEM_ID_1)).toEqual(ITEM_DATA_1);
    expect(registry.getCount()).toEqual(1);
  });

  it('should overwrite item', () => {
    const registry = new Registry();
    const ITEM_DATA_1_OVERWRITTEN = {
      dataOverwritten: 'testDataOverwritten',
    };

    registry.add(ITEM_ID_1, ITEM_DATA_1);
    registry.add(ITEM_ID_1, ITEM_DATA_1_OVERWRITTEN);

    expect(registry.getCount()).toEqual(1);
    expect(registry.get(ITEM_ID_1)).toEqual(ITEM_DATA_1_OVERWRITTEN);
  });

  it('should call callbacks in item loop', () => {
    const registry = new Registry();
    const callback = {
      callback: () => {
        return;
      },
    };

    registry.add(ITEM_ID_1, ITEM_DATA_1);

    spyOn(callback, 'callback');

    registry.forEach(callback.callback);

    expect(callback.callback).toHaveBeenCalledWith(ITEM_DATA_1, ITEM_ID_1);
    expect((callback.callback as any).calls.count()).toEqual(1);
  });

  it('should remove item', () => {
    const registry = new Registry();

    registry.add(ITEM_ID_1, ITEM_DATA_1);
    expect(registry.getCount()).toEqual(1);

    registry.remove(ITEM_ID_1);
    expect(registry.has(ITEM_ID_1)).toBeFalsy();
    expect(registry.getCount()).toEqual(0);
  });

  it('should throw error while removing missing id', () => {
    const registry = new Registry();

    expect(() => {
      registry.remove(MISSING_ITEM_ID);
    }).toThrow();
  });

  it('should get item', () => {
    const registry = new Registry();

    registry.add(ITEM_ID_1, ITEM_DATA_1);
    expect(registry.getCount()).toEqual(1);
    expect(registry.get(ITEM_ID_1)).toEqual(ITEM_DATA_1);

    registry.add(ITEM_ID_2, ITEM_DATA_2);
    expect(registry.getCount()).toEqual(2);
    expect(registry.get(ITEM_ID_1)).toEqual(ITEM_DATA_1);
    expect(registry.get(ITEM_ID_2)).toEqual(ITEM_DATA_2);
  });

  it('should throw error while getting missing id', () => {
    const registry = new Registry();

    expect(() => {
      registry.get(MISSING_ITEM_ID);
    }).toThrow();
  });

  it('should return false when checking for missing item', () => {
    const registry = new Registry();

    expect(registry.has(MISSING_ITEM_ID)).toBeFalsy();
  });

  it('should return true when checking for item', () => {
    const registry = new Registry();

    registry.add(ITEM_ID_1, ITEM_DATA_1);
    expect(registry.has(ITEM_ID_1)).toBeTruthy();
  });

  it('should clear items', () => {
    const registry = new Registry();

    registry.add(ITEM_ID_1, ITEM_DATA_1);
    registry.add(ITEM_ID_2, ITEM_DATA_2);
    expect(registry.getCount()).toEqual(2);

    registry.clear();
    expect(registry.has(ITEM_ID_1)).toBeFalsy();
    expect(registry.has(ITEM_ID_2)).toBeFalsy();
    expect(registry.getCount()).toEqual(0);
  });

  it('should get item count', () => {
    const registry = new Registry();

    registry.add(ITEM_ID_1, ITEM_DATA_1);
    expect(registry.getCount()).toEqual(1);
  });
});
