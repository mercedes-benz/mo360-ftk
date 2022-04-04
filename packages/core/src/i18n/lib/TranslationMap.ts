// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { cloneDeep, forEach, get, keys, merge, uniq } from 'lodash';
import { Registry } from '../../util/Registry';
import IMessage from '../lib/interface/IMessage';
import ITranslation from '../lib/interface/ITranslation';
import ITranslationMap from '../lib/interface/ITranslationMap';

class TranslationMap {
    public static merge(originalMap: ITranslationMap, updatingMap: ITranslationMap): ITranslationMap {
        return merge(cloneDeep(originalMap), updatingMap);
    }

    public static convert(map: ITranslationMap): ITranslation[] {
        const languages: string[] = keys(map);
        let translationIds: string[] = [];
        const translations: ITranslation[] = [];

        forEach(languages, language => {
            translationIds = uniq(translationIds.concat(keys(get(map, language, []))));
        });

        forEach(translationIds, translationId => {
            const translation: ITranslation = {
                messages: new Registry<IMessage>(),
                translationId,
            };

            forEach(languages, lang => {
                const message = get(map, [lang, translationId], null);

                if (message === null) {
                    throw new Error(`missing translationId "${translationId}" in ${lang}`);
                }

                translation.messages.add(lang, { lang, message });
            });

            translations.push(translation);
        });

        return translations;
    }
}

export default TranslationMap;
