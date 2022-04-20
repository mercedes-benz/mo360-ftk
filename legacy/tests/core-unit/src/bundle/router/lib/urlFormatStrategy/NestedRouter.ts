// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import NestedRouterStrategy from '@daimler/ftk-core/lib/router/lib/urlFormatStrategy/NestedRouterStrategy';

describe('bundle/router/lib/urlFormatStrategy/NestedRouter', () => {
    let router: NestedRouterStrategy;
    const routerName = 'name';
    const routerBaseUrl = '/baseUrl';

    beforeEach(() => {
        router = new NestedRouterStrategy(routerName, routerBaseUrl);
    });

    it('should extract correct url', () => {
        const url = 'http://localhost:8080/test/url/with/folders';
        const expected = '';
        expect(router.extract(url)).toEqual(expected);
    });

    it('should extract correct url with hashbang (#!)', () => {
        const expected = '/test';
        const url = `http://localhost:8080/#!${routerBaseUrl}?_${routerName}=${encodeURIComponent(expected)}`;
        expect(router.extract(url)).toEqual(expected);
    });

    it('should format correct url', () => {
        const url = '/path';
        const expected = `#!${routerBaseUrl}?_${routerName}=${encodeURIComponent(url)}`;
        expect(router.format(url)).toEqual(expected);
    });

    it('should format correct url with query', () => {
        const url = '/path';
        const query = '?foo=bar&number=1&bool=true';
        const expected = `#!${routerBaseUrl}?_${routerName}=${encodeURIComponent(url + query)}`;
        expect(router.format(url + query)).toEqual(expected);
    });
});
