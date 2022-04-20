// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import Router from '@daimler/ftk-core/lib/router/lib/Router';
import { setGlobalDomObjects } from '../../../helpers/router/jsdom';

describe('bundle/router/lib/Router', () => {
    let router: Router;
    setGlobalDomObjects('http://localhost:8082');

    beforeEach(() => {
        router = new Router();
    });

    it('should have NULL as initial active route', () => {
        expect(router.getActiveRoute()).toBeNull();
    });

    it("should NOT have a 'test' route", () => {
        expect(router.hasRoute('test')).toEqual(false);
    });

    it('should add a new route', () => {
        router.addRoute('test', '/test', null);
        expect(router.hasRoute('test')).toEqual(true);
    });

    it('should remove an existing route', () => {
        router.addRoute('test', '/test', null);
        router.removeRoute('test');
        expect(router.hasRoute('test')).toEqual(false);
    });

    it('should NOT have NULL as active route after navigate', () => {
        router.addRoute('test', '/test', null);
        router.navigate('/test');
        expect(router.getActiveRoute()).not.toBeNull();
    });

    it('should have correct route as active route after navigate', () => {
        let activeRoute;
        router.addRoute('A', '/a', null);
        router.addRoute('B', '/b', null);
        router.navigate('/a');
        activeRoute = router.getActiveRoute();
        expect(activeRoute.name).toEqual('A');
        expect(activeRoute.pattern).toEqual('/a');
        expect(activeRoute.component).toEqual(null);
        router.navigate('/b');
        activeRoute = router.getActiveRoute();
        expect(activeRoute.name).toEqual('B');
        expect(activeRoute.pattern).toEqual('/b');
        expect(activeRoute.component).toEqual(null);
        router.navigate('/a');
        activeRoute = router.getActiveRoute();
        expect(activeRoute.name).toEqual('A');
        expect(activeRoute.pattern).toEqual('/a');
        expect(activeRoute.component).toEqual(null);
    });

    it('should have correct route as active route after navigate with query', () => {
        router.addRoute('A', '/a', null);
        router.navigate('/a', { foo: 'bar', number: 1, bool: true });
        const activeRoute = router.getActiveRoute();
        expect(activeRoute.query).not.toBeNull();
        expect(activeRoute.query.foo).toEqual('bar');
        expect(activeRoute.query.number).toEqual(1);
        expect(activeRoute.query.bool).toEqual(true);
        expect(activeRoute.url).not.toBeNull();
        expect(activeRoute.url).toEqual('/a?foo=bar&number=1&bool=true');
    });

    it('should have correct route as active route after navigate with parameter', () => {
        router.addRoute('A', '/a/:param', null);
        router.navigate('/a/foobar');
        const activeRoute = router.getActiveRoute();
        expect(activeRoute.name).toEqual('A');
        expect(activeRoute.url).not.toBeNull();
        expect(activeRoute.url).toEqual('/a/foobar');
        expect(activeRoute.parameter).not.toBeNull();
        expect(activeRoute.parameter).toEqual({ param: 'foobar' });
    });

    it('should keep active route if navigate to unknown route', () => {
        router.addRoute('A', '/a', null);
        router.addRoute('B', '/b', null);
        router.navigate('/a');
        const activeRouteBefore = router.getActiveRoute();
        router.navigate('/c');
        const activeRouteAfter = router.getActiveRoute();
        expect(activeRouteBefore.name).toEqual(activeRouteAfter.name);
        expect(activeRouteBefore).toEqual(activeRouteAfter);
    });

    it('should have NULL as active route if no routes have been added and a navigate call is been fired', () => {
        router.navigate('/a');
        expect(router.getActiveRoute()).toBeNull();
    });

    it('should return correct path to route', () => {
        router.addRoute('test', '/test', null);
        expect(router.linkTo('test')).toEqual('/test');
    });

    it('should return correct path to wildcard route', () => {
        router.addRoute('test', '/test/*', null);
        expect(router.linkTo('test')).toEqual('/test/');
    });

    it('should return correct path to parameter route', () => {
        router.addRoute('test', '/test/:param', null);
        expect(router.linkTo('test', { param: 'foobar' })).toEqual('/test/foobar');
    });

    it('should return correct path to parameter route with query', () => {
        router.addRoute('test', '/test/:param', null);
        expect(router.linkTo('test', { param: 'foobar' }, { number: 1, bool: true })).toEqual(
            '/test/foobar?number=1&bool=true',
        );
    });

    it('should throw an error for unknown route names', () => {
        const unknownRouteName = 'doesnotexist';
        const expectedError = `Unknown route for link to route 'doesnotexist'.`;
        expect(() => router.linkTo(unknownRouteName)).toThrowError(expectedError);
    });
});
