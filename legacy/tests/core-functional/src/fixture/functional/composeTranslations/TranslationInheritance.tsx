// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { composeTranslations, ITranslationMap } from '@daimler/ftk-core';
import SampleTranslations from './SampleTranslations';

const parentMap: ITranslationMap = {
  de: {
    DO_NOT_TOUCH: 'overwrite-not-allowed-de',
    MESSAGE1: 'parent-foo-de',
    MESSAGE2: 'parent-bar-de',
    LOCALE1: `Hallo {name}, du hast {unreadCount, number} {unreadCount, plural, one {Nachricht} other {Nachrichten}}`,
  },
  en: {
    DO_NOT_TOUCH: 'overwrite-not-allowed-en',
    MESSAGE1: 'parent-foo-en',
    MESSAGE2: 'parent-bar-en',
    LOCALE1: `Hello {name}, you have {unreadCount, number} {unreadCount, plural, one {message} other {messages}}`,
  },
};

const componentLocalMap: ITranslationMap = {
  de: {
    MESSAGE2: 'updated-bar-de',
    MESSAGE3: 'new-foobar-de',
  },
  en: {
    MESSAGE2: 'updated-bar-en',
    MESSAGE3: 'new-foobar-en',
  },
};

export const Translations = composeTranslations(composeTranslations(SampleTranslations, componentLocalMap), parentMap);

export const ParentTranslations = composeTranslations(SampleTranslations, {
  de: {
    MESSAGE1: 'parent-foo-de',
  },
  en: {
    MESSAGE1: 'parent-foo-en',
  },
});
