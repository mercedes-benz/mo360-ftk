// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import DefaultRouterStrategy from '@daimler/ftk-core/lib/router/lib/urlFormatStrategy/DefaultRouterStrategy';

describe('bundle/router/lib/urlFormatStrategy/DefaultRouter', () => {
    let router: DefaultRouterStrategy;

    beforeEach(() => {
        router = new DefaultRouterStrategy(null, null);
    });

    it('should extract correct url', () => {
        const url = 'http://localhost:8080/test/url/with/folders';
        const expected = '';
        expect(router.extract(url)).toEqual(expected);
    });

    it('should extract correct url with hashbang (#!)', () => {
        const url = 'http://localhost:8080/#!/test/url/with/folders';
        const expected = '/test/url/with/folders';
        expect(router.extract(url)).toEqual(expected);
    });

    it('should format correct url', () => {
        const url = '/path';
        const expected = '#!/path';
        expect(router.format(url)).toEqual(expected);
    });

    it('should format correct url with query', () => {
        const url = '/path?foo=bar&number=1&bool=true';
        const expected = '#!/path?foo=bar&number=1&bool=true';
        expect(router.format(url)).toEqual(expected);
    });
});
