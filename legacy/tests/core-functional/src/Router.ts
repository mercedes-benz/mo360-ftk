// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { navigateToPath, useTestComponent } from './Common';
describe('Router', () => {
  describe('routing navigation', () => {
    beforeAll(() => {
      useTestComponent('Router');
    });

    it('Should show the default route if no hash is specified', () => {
      $('.router-default').waitForExist();
      expect($$('.router-default').length).toEqual(1);
    });

    it('Should show the default route if an empty hash is specified', () => {
      $('.router-default').waitForExist();
      expect($$('.router-default').length).toEqual(1);
    });

    it('Should navigate to a route', () => {
      navigateToPath('/#!/test1');
      $('.router-test-1').waitForExist();
      expect($$('.router-test-1').length).toEqual(1);
    });

    it('Should return to a route when the back navigation is used', () => {
      navigateToPath('/#!/test1');
      navigateToPath('/#!/test2');
      browser.back();
      $('.router-test-1').waitForExist();
      expect($$('.router-test-1').length).toEqual(1);
    });

    it('Should be able to forward to a route when the forward navigation is used', () => {
      navigateToPath('/#!/test1');
      navigateToPath('/#!/test2');
      browser.back();
      browser.forward();
      expect($$('.router-test-2').length).toEqual(1);
    });

    it('Should parse parameters comming from the query string correctly', () => {
      navigateToPath('/#!/test1?echo=Foobar');
      expect($('.route-echo').getText()).toEqual('Foobar');
      navigateToPath('/#!/test1?echo=bar');
      expect($('.route-echo').getText()).toEqual('bar');
    });

    it('Should parse parameters comming from the params string correctly', () => {
      navigateToPath('/#!/test3/123');
      expect($('.route-echo').getText()).toEqual('123');
      navigateToPath('/#!/test3/456');
      expect($('.route-echo').getText()).toEqual('456');
    });

    it('Should be able handle routes with optional parameters - without parameter', () => {
      navigateToPath('/#!/');
      navigateToPath('/#!/test4');
      expect($('.route-echo').getText()).toEqual('');
    });

    it('Should be able handle routes with optional parameters - with parameter', () => {
      navigateToPath('/#!/');
      navigateToPath('/#!/test4/456');
      expect($('.route-echo').getText()).toEqual('456');
    });

    it('Should be able handle routes with optional parameters - not optional without parameter -> falsy', () => {
      navigateToPath('/#!/');
      navigateToPath('/#!/test3');
      expect($('.route-echo').isExisting()).toBeFalsy();
    });

    it('Should be able to navigate using .navigate() ', () => {
      navigateToPath('/#!/test1?redirect=Test2');
      expect($$('.router-test-2').length).toEqual(1);
    });
  });

  describe('nested routes within a Swidget', () => {
    beforeEach(() => {
      navigateToPath('/#!/host');
    });

    // Invoke navigation inside of the browser
    const navigateToRoute = (name: string, params: object = {}, query: object = {}) => {
      $('.nextroute-name').waitForExist();
      const paramsSerialized = JSON.stringify(params);
      const querySerialized = JSON.stringify(query);
      $('.nextroute-name').setValue(name);
      $('.nextroute-params').setValue(paramsSerialized);
      $('.nextroute-query').setValue(querySerialized);
      $('.nextroute-go').click();
    };

    it('should trigger the nested default route without trailing slash', () => {
      $('.router-navigation-remote').waitForExist();
    });

    it('should trigger the nested default route with trailing slash', () => {
      navigateToPath('/#!/host/');
      $('.router-navigation-remote').waitForExist();
      expect($('.route-name').getText()).toEqual('NestedDefault');
    });

    it('should be possible to pass variable in the query string of a nested route', () => {
      navigateToRoute('Nested1', {}, { echo: 'Foobar' });
      $('.router-navigation-remote').waitForExist();
      expect($('.route-echo').getText()).toEqual('Foobar');
    });

    it('should be possible to navigate back and forth between two nested routes', () => {
      navigateToRoute('Nested1');
      navigateToRoute('Nested2');
      browser.back();
      expect($('.route-name').getText()).toEqual('Nested1');
      browser.forward();
      expect($('.route-name').getText()).toEqual('Nested2');
    });

    it('should be possible to navigate back and forth between default and nested route', () => {
      navigateToRoute('Nested1');
      browser.back();
      expect($('.route-name').getText()).toEqual('NestedDefault');
      browser.forward();
      expect($('.route-name').getText()).toEqual('Nested1');
    });

    it('should be possible to extract the parameter from a nested route', () => {
      const params = { id: '123' };
      navigateToRoute('Nested3', params);
      $('.route-params').waitForExist();
      expect($('.route-params').getText()).toEqual(JSON.stringify(params));
    });

    it('should be possible to navigate to a nested route with multiple parameter ', () => {
      const params = { id: '123', action: 'foobar' };
      navigateToRoute('Nested4', params);
      $('.route-params').waitForExist();
      expect($('.route-params').getText()).toEqual(JSON.stringify(params));
    });

    it('should be possible to deep-link into a nested route', () => {
      // nested route use a specialized format for urls to encode routes for swidgets
      const u = 'http://router.localtest.me:8080/#!/host?_NestingHost_router=%2Fnested2&_NestingHost_=%2Fnested2';
      // triggers hard-relead of the website
      browser.url(u);
      $('.route-name').waitForExist();
      expect($('.route-name').getText()).toEqual('Nested2');
    });
  });

  describe('Render React.ComponentType and React.ReactElement', () => {
    it('should be possible to render a route with a JSX Element component', () => {
      navigateToPath('/#!/jsx-element');
      $('.router-test-jsx').waitForExist();
      expect($('.router-test-jsx').getText()).toEqual('JSX Element');
    });

    it('should be possible to render a route with a Class component', () => {
      navigateToPath('/#!/class-component');
      $('.router-test-class-component').waitForExist();
      expect($('.router-test-class-component').getText()).toEqual('Class Component');
    });

    it('should be possible to render a route with a Class component element', () => {
      navigateToPath('/#!/class-component-element');
      $('.router-test-class-component').waitForExist();
      expect($('.router-test-class-component').getText()).toEqual('Class Component');
    });

    it('should be possible to render a route with an Arrow Function component', () => {
      navigateToPath('/#!/arrow-function-component');
      $('.router-test-arrow-function-component').waitForExist();
      expect($('.router-test-arrow-function-component').getText()).toEqual('Arrow Function Component');
    });

    it('should be possible to render a route with an Arrow Function component element', () => {
      navigateToPath('/#!/arrow-function-component-element');
      $('.router-test-arrow-function-component').waitForExist();
      expect($('.router-test-arrow-function-component').getText()).toEqual('Arrow Function Component');
    });

    it('should be possible to render a route with an Function component', () => {
      navigateToPath('/#!/function-component');
      $('.router-test-function-component').waitForExist();
      expect($('.router-test-function-component').getText()).toEqual('Function Component');
    });

    it('should be possible to render a route with an Function component element', () => {
      navigateToPath('/#!/function-component-element');
      $('.router-test-function-component').waitForExist();
      expect($('.router-test-function-component').getText()).toEqual('Function Component');
    });

    it('should NOT re-mount a component on param change', () => {
      navigateToPath('/#!/mount-component/abc');
      $('.router-test-mount-component').waitForExist();
      expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
      expect($('.text-param').getText()).toEqual('abc');
      const textRandom = $('.text-random').getText();

      navigateToPath('/#!/mount-component/xyz');
      $('.router-test-mount-component').waitForExist();
      expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
      expect($('.text-param').getText()).toEqual('xyz');
      expect($('.text-random').getText()).toEqual(textRandom);
    });

    // it('should NOT re-mount a component element on param change', () => {
    //     navigateToPath('/#!/mount-component-element/abc');
    //     $('.router-test-mount-component').waitForExist();
    //     expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
    //     expect($('.text-param').getText()).toEqual('abc');
    //     const textRandom = $('.text-random').getText();

    //     navigateToPath('/#!/mount-component-element/xyz');
    //     $('.router-test-mount-component').waitForExist();
    //     expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
    //     expect($('.text-param').getText()).toEqual('xyz');
    //     expect($('.text-random').getText()).toEqual(textRandom);
    // });

    it('should NOT re-mount a component on query change', () => {
      navigateToPath('/#!/mount-component/tab?info=abc');
      $('.router-test-mount-component').waitForExist();
      expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
      expect($('.text-param').getText()).toEqual('tab');
      expect($('.text-query').getText()).toEqual('abc');
      const textRandom = $('.text-random').getText();

      navigateToPath('/#!/mount-component/tab?info=xyz');
      $('.router-test-mount-component').waitForExist();
      expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
      expect($('.text-param').getText()).toEqual('tab');
      expect($('.text-query').getText()).toEqual('xyz');
      expect($('.text-random').getText()).toEqual(textRandom);
    });

    // it('should NOT re-mount a component element on query change', () => {
    //     navigateToPath('/#!/mount-component-element/tab?info=abc');
    //     $('.router-test-mount-component').waitForExist();
    //     expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
    //     expect($('.text-param').getText()).toEqual('tab');
    //     expect($('.text-query').getText()).toEqual('abc');
    //     const textRandom = $('.text-random').getText();

    //     navigateToPath('/#!/mount-component-element/tab?info=xyz');
    //     $('.router-test-mount-component').waitForExist();
    //     expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
    //     expect($('.text-param').getText()).toEqual('tab');
    //     expect($('.text-query').getText()).toEqual('xyz');
    //     expect($('.text-random').getText()).toEqual(textRandom);
    // });

    it('should re-mount a component on route change', () => {
      navigateToPath('/#!/mount-component/abc');
      $('.router-test-mount-component').waitForExist();
      expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
      expect($('.text-param').getText()).toEqual('abc');
      const textRandom = $('.text-random').getText();

      navigateToPath('/#!/duplicate-mount-component/xyz');
      $('.router-test-mount-component').waitForExist();
      expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
      expect($('.text-param').getText()).toEqual('xyz');
      expect($('.text-random').getText()).not.toEqual(textRandom);
    });

    // it('should re-mount a component element on route change', () => {
    //     navigateToPath('/#!/mount-component-element/abc');
    //     $('.router-test-mount-component').waitForExist();
    //     expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
    //     expect($('.text-param').getText()).toEqual('abc');
    //     const textRandom = $('.text-random').getText();

    //     navigateToPath('/#!/duplicate-mount-component-element/xyz');
    //     $('.router-test-mount-component').waitForExist();
    //     expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
    //     expect($('.text-param').getText()).toEqual('xyz');
    //     expect($('.text-random').getText()).not.toEqual(textRandom);
    // });

    it('should re-mount a component on param change when forceRemount is set', () => {
      navigateToPath('/#!/force-mount-component/abc');
      $('.router-test-mount-component').waitForExist();
      expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
      expect($('.text-param').getText()).toEqual('abc');
      const textRandom = $('.text-random').getText();

      navigateToPath('/#!/force-mount-component/xyz');
      $('.router-test-mount-component').waitForExist();
      expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
      expect($('.text-param').getText()).toEqual('xyz');
      expect($('.text-random').getText()).not.toEqual(textRandom);
    });

    // it('should re-mount a component element on param change when forceRemount is set', () => {
    //     navigateToPath('/#!/force-mount-component-element/abc');
    //     $('.router-test-mount-component').waitForExist();
    //     expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
    //     expect($('.text-param').getText()).toEqual('abc');
    //     const textRandom = $('.text-random').getText();

    //     navigateToPath('/#!/force-mount-component-element/xyz');
    //     $('.router-test-mount-component').waitForExist();
    //     expect($('.router-test-mount-component').getText()).toEqual('Mount Component');
    //     expect($('.text-param').getText()).toEqual('xyz');
    //     expect($('.text-random').getText()).not.toEqual(textRandom);
    // });
  });
});

describe('Nested routes with multiple swidgets', () => {
  beforeAll(() => {
    useTestComponent('ComponentLoader');
  });
  describe('', () => {
    beforeEach(() => {
      navigateToPath('/#!/subroutes');
    });

    it('should navigate within a swidget and not touch the other swidgets', () => {
      $('.swidget-uniqueid').waitForExist();
      $('.goto-sr11').click();
      $('.subroute-sr11').waitForExist();
      expect($('.swidget-uniqueid').getText()).toEqual('2');
    });

    it('should display both swidgets home route when not explicit subroute is set in url', () => {
      $('.swidget-uniqueid').waitForExist();
      const uniqueId1 = browser.$$('.swidget-uniqueid')[0].getText();
      expect(uniqueId1).toEqual('1');
      const uniqueId2 = browser.$$('.swidget-uniqueid')[1].getText();
      expect(uniqueId2).toEqual('2');
    });

    it('should navigate within swidget, and afterwards within another swidget, and not touch the other', () => {
      $('.swidget-uniqueid').waitForExist();
      $('.goto-sr11').click();
      $('.goto-sr21').click();
      $('.subroute-sr11').waitForExist();
      $('.subroute-sr21').waitForExist();
      expect($('.subroute-sr11').getText()).toEqual('SR1_1');
      expect($('.subroute-sr21').getText()).toEqual('SR2_1');
    });

    it('should navigate within both swidgets, go back in history, and go back only in the alst navigated swidget', () => {
      $('.swidget-uniqueid').waitForExist();
      $('.goto-sr11').click();
      $('.goto-sr21').click();
      $('.subroute-sr11').waitForExist();
      $('.subroute-sr21').waitForExist();
      browser.back();
      $('.swidget-uniqueid').waitForExist();
      const uniqueId = $('.swidget-uniqueid').getText();
      expect(uniqueId).toEqual('2');
    });

    it('should be able to deep-link into two swidgets subroutes', () => {
      // nested route use a specialized format for urls to encode routes for swidgets
      const url =
        'http://componentloader.localtest.me:8080/' +
        '#!/subroutes?_subroutes_2=%2Fsubroute1&_subroutes_1=%2Fsubroute1';
      // triggers hard-relead of the website
      browser.url(url);
      $('.subroute-sr11').waitForExist();
      $('.subroute-sr21').waitForExist();
    });
  });
});
