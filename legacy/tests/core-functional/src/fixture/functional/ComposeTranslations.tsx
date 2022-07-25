// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { IDiContainer, IRouteConfig, Route, serviceIds, App } from '@daimler/ftk-core';
import * as React from 'react';
import LocaleTranslations from './composeTranslations/LocaleTranslations';
import SampleTranslations from './composeTranslations/SampleTranslations';
import ToggleLanguageForSwidget from './composeTranslations/ToggleLanguageForSwidget';
import { ParentTranslations, Translations } from './composeTranslations/TranslationInheritance';

/**
 * These are translations keys for which we have setup various translations in our test setup.
 */
const keys = ['MESSAGE1', 'MESSAGE2', 'MESSAGE3', 'DO_NOT_TOUCH'];

const config = Object.seal({
  core: {
    i18n: {
      defaultLocale: 'de',
      map: {
        de: {
          DO_NOT_TOUCH: 'from-config-do-not-touch-de',
        },
        en: {
          DO_NOT_TOUCH: 'from-config-do-not-touch-en',
        },
      },
    },
  },
  project: {},
  runtime: {},
});

const registerRoutes = (container: IDiContainer) => {
  container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue([
    {
      component: () => <h1>No test selected</h1>,
      name: 'home',
      pattern: '/',
    },
    {
      component: () => <Translations translationKeys={keys} />,
      name: 'composition',
      pattern: '/composition',
    },

    /**
     * A parent component with translations that surround a child component which does not supply own translations
     */
    {
      component: () => (
        <Translations className="translation-parent">
          <SampleTranslations translationKeys={keys} className="translation-child" />
        </Translations>
      ),
      name: 'parentwithtranslations',
      pattern: '/parentwithtranslations',
    },
    /**
     * A parent without any translations, but a child component that has translations
     */
    {
      component: () => (
        <ParentTranslations className="translation-parent" translationKeys={keys}>
          <Translations className="translation-child" translationKeys={keys} />
        </ParentTranslations>
      ),
      name: 'parenttranslations',
      pattern: '/parenttranslations',
    },
    {
      component: () => (
        <>
          <ParentTranslations className="sibling-1" translationKeys={keys} />
          <Translations className="sibling-2" translationKeys={keys} />
        </>
      ),
      name: 'siblingtranslations',
      pattern: '/siblingtranslations',
    },
    {
      component: () => (
        <ParentTranslations className="l1" translationKeys={keys}>
          <ParentTranslations className="l2" translationKeys={keys} />
        </ParentTranslations>
      ),
      name: 'test',
      pattern: '/test',
    },
    {
      component: ToggleLanguageForSwidget,
      name: 'togglelanguageforswidget',
      pattern: '/togglelanguageforswidget',
    },
    {
      component: () => (
        <Translations className="translation-parent">
          <LocaleTranslations />
        </Translations>
      ),
      name: 'localetranslations',
      pattern: '/localetranslations',
    },
  ]);
};

export default () => (
  <App name="composeTranslations" init={registerRoutes} config={config}>
    <Route />
  </App>
);
