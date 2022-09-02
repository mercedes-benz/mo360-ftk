// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import ITranslationMap from './ITranslationMap';
interface II18nConfig {
    defaultLocale: string;
    map?: ITranslationMap;
}

export default II18nConfig;
