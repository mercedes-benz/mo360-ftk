// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import Url from '@daimler/ftk-core/lib/util/Url';

const TESTPATH_NO_HOST = '/path/to/test';
const SEGMENTS = ['path', 'to', 'test'];
const PARAMS = {
  bar: 'foo',
  foo: 'bar',
};

describe('util/Url', () => {
  it('should return path segments', () => {
    expect(Url.extractPath('http://localhost:8080/path/to/test')).toEqual(SEGMENTS);
  });

  it('should return empty array without path segments', () => {
    expect(Url.extractPath('http://localhost:8080/')).toEqual([]);
  });

  it('should build path', () => {
    expect(Url.buildPathFromSegments(SEGMENTS)).toEqual(TESTPATH_NO_HOST);
  });

  it('should extract hashbang', () => {
    expect(Url.extractHashbang('http://localhost:8080/#!/path/to/test')).toEqual(TESTPATH_NO_HOST);
  });

  it('should add hashbang', () => {
    expect(Url.buildHashbang(TESTPATH_NO_HOST)).toEqual('#!' + TESTPATH_NO_HOST);
  });

  it('should extract query', () => {
    expect(Url.extractQuery('http://localhost:8080/path/to/test?bar=foo&foo=bar')).toEqual(PARAMS);
  });

  it('should build query', () => {
    expect(Url.buildQueryFromParameters(PARAMS)).toEqual('?bar=foo&foo=bar');
  });

  it('should not build query without params', () => {
    expect(Url.buildQueryFromParameters()).toEqual('');
  });
});
