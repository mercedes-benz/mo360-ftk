// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import ITranslationMapItem from './ITranslationMapItem';

interface ITranslationMap {
    [index: string]: ITranslationMapItem;
}

export default ITranslationMap;
