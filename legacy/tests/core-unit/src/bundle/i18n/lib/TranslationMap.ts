// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import IMessage from '@daimler/ftk-core/lib/i18n/lib/interface/IMessage';
import ITranslation from '@daimler/ftk-core/lib/i18n/lib/interface/ITranslation';
import ITranslationMap from '@daimler/ftk-core/lib/i18n/lib/interface/ITranslationMap';
import TranslationMap from '@daimler/ftk-core/lib/i18n/lib/TranslationMap';
import Registry from '@daimler/ftk-core/lib/util/Registry';

describe('bundle/i18n/lib/TranslationMap', () => {
    it('should add and overwrite translations', () => {
        const originalMap: ITranslationMap = {
            de: {
                MESSAGE1: 'foo-de',
                MESSAGE2: 'bar-de',
            },
            en: {
                MESSAGE1: 'foo-en',
                MESSAGE2: 'bar-en',
            },
        };
        const updatingMap: ITranslationMap = {
            de: {
                MESSAGE2: 'reset-de',
                MESSAGE3: 'foobar-de',
            },
            en: {
                MESSAGE2: 'reset-en',
                MESSAGE3: 'foobar-en',
            },
        };
        const mergedMap: ITranslationMap = {
            de: {
                MESSAGE1: 'foo-de',
                MESSAGE2: 'reset-de',
                MESSAGE3: 'foobar-de',
            },
            en: {
                MESSAGE1: 'foo-en',
                MESSAGE2: 'reset-en',
                MESSAGE3: 'foobar-en',
            },
        };
        expect(TranslationMap.merge(originalMap, updatingMap)).toEqual(mergedMap);
    });

    it('should re-map translations', () => {
        const basicMap = {
            de: {
                MESSAGE1: 'foo-de',
            },
            en: {
                MESSAGE1: 'foo-en',
            },
        };
        const convertedMap: ITranslation = {
            messages: new Registry<IMessage>(),
            translationId: 'MESSAGE1',
        };
        const messageDe: IMessage = {
            lang: 'de',
            message: 'foo-de',
        };
        const messageEn: IMessage = {
            lang: 'en',
            message: 'foo-en',
        };

        convertedMap.messages.add('de', messageDe);
        convertedMap.messages.add('en', messageEn);

        expect(TranslationMap.convert(basicMap)).toEqual([convertedMap]);
    });

    it('should throw error on missing translationIds', () => {
        const invalidMap: ITranslationMap = {
            de: {
                MESSAGE1: 'foo-de',
                MESSAGE2: 'bar-de',
            },
            en: {
                MESSAGE1: 'foo-en',
            },
        };

        expect(() => {
            TranslationMap.convert(invalidMap);
        }).toThrow();
    });
});
