// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { navigateToPath, useTestComponent } from './Common';
describe('ComposeTranslations', () => {
  beforeAll(() => {
    useTestComponent('ComposeTranslations');
  });

  describe('Nested Translations', () => {
    it(
      'should make sure a child component uses the translation from the parent component if no component-local' +
        ' translation is available',
      (done) => {
        browser.reloadSession();
        navigateToPath('/#!/parentwithtranslations');
        $('.translation-child').waitForExist();
        expect($('.translation-child .translation:nth-child(1)').getText()).toEqual('parent-foo-de');
        expect($('.translation-child .translation:nth-child(2)').getText()).toEqual('updated-bar-de');
        expect($('.translation-child .translation:nth-child(3)').getText()).toEqual('new-foobar-de');
        expect($('.translation-child .translation:nth-child(4)').getText()).toEqual('from-config-do-not-touch-de');
        browser.call(done as any);
      },
    );

    it('should make sure a parent component does not use translations from any child component', (done) => {
      browser.reloadSession();
      navigateToPath('/#!/parenttranslations');
      $('.translation-parent').waitForExist();
      expect($('.translation-parent .translation:nth-child(2)').getText()).toEqual('MESSAGE2');
      expect($('.translation-parent .translation:nth-child(3)').getText()).toEqual('MESSAGE3');
      expect($('.translation-parent .translation:nth-child(4)').getText()).toEqual('from-config-do-not-touch-de');
      browser.call(done as any);
    });

    it(
      'should make sure a child component overwrites the translation from the parent component with its' +
        ' component-local translation if available',
      (done) => {
        browser.reloadSession();
        navigateToPath('/#!/parenttranslations');
        $('.translation-child').waitForExist();
        expect($('.translation-child .translation:nth-child(1)').getText()).toEqual('parent-foo-de');
        browser.call(done as any);
      },
    );

    it(
      'should make sure two sibling components of different type using the same translation key can show' +
        ' different translations',
      (done) => {
        browser.reloadSession();
        navigateToPath('/#!/siblingtranslations');
        $('.sibling-1').waitForExist();
        $('.sibling-2').waitForExist();
        expect($('.sibling-1 .translation:nth-child(1)').getText()).toEqual('parent-foo-de');
        expect($('.sibling-2 .translation:nth-child(1)').getText()).toEqual('parent-foo-de');
        browser.call(done as any);
      },
    );
  });

  describe('Translation composition', () => {
    beforeAll(() => {
      navigateToPath('/#!/composition');
    });

    it('should never overwrite translations that are registered in the configuration ', (done) => {
      $('.translations ').waitForExist();
      expect($('.translations .translation:nth-child(4)').getText()).toEqual('from-config-do-not-touch-de');
      browser.call(done as any);
    });

    it('should add new translation items', (done) => {
      $('.translations ').waitForExist();
      expect($('.translations .translation:nth-child(3)').getText()).toEqual('new-foobar-de');
      browser.call(done as any);
    });

    it('should overwrite translations in child components', (done) => {
      $('.translations ').waitForExist();
      expect($('.translations .translation:nth-child(1)').getText()).toEqual('parent-foo-de');
      expect($('.translations .translation:nth-child(2)').getText()).toEqual('updated-bar-de');
      browser.call(done as any);
    });

    it('should toggle language', (done) => {
      $('.translations ').waitForExist();
      $('.toggle-language').click();
      expect($('.translations .translation:nth-child(1)').getText()).toEqual('parent-foo-en');
      expect($('.translations .translation:nth-child(2)').getText()).toEqual('updated-bar-en');
      expect($('.translations .translation:nth-child(3)').getText()).toEqual('new-foobar-en');
      expect($('.translations .translation:nth-child(4)').getText()).toEqual('from-config-do-not-touch-en');
      $('.toggle-language').click();
      expect($('.translations .translation:nth-child(1)').getText()).toEqual('parent-foo-de');
      expect($('.translations .translation:nth-child(2)').getText()).toEqual('updated-bar-de');
      expect($('.translations .translation:nth-child(3)').getText()).toEqual('new-foobar-de');
      expect($('.translations .translation:nth-child(4)').getText()).toEqual('from-config-do-not-touch-de');
      browser.call(done as any);
    });
  });

  describe('Translations for Swidgets', () => {
    beforeEach(() => {
      navigateToPath('/#!/togglelanguageforswidget');
    });

    it('Should use the language from the host app for translations', () => {
      $('.swidget-message').waitForExist();
      expect($('.swidget-message').getText()).toEqual('swidget-message-de');
      $('.toggle-language').click();
      expect($('.swidget-message').getText()).toEqual('swidget-message-en');
      $('.toggle-language').click();
    });
  });

  describe('Translations with locales', () => {
    beforeEach(() => {
      navigateToPath('/#!/localetranslations');
    });

    it('should show correct translated text', (done) => {
      $('.translation ').waitForExist();
      expect($('.translation').getText()).toEqual('Hallo Eric, du hast 1.000 Nachrichten');
      $('.toggle-language').click();
      expect($('.translation').getText()).toEqual('Hello Eric, you have 1,000 messages');
      browser.call(done as any);
    });
  });
});
