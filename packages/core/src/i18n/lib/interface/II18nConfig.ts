// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import ITranslationMap from './ITranslationMap';
interface II18nConfig {
    defaultLocale: string;
    map?: ITranslationMap;
}

export default II18nConfig;
