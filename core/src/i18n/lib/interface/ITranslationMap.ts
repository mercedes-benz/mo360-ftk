// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import ITranslationMapItem from './ITranslationMapItem';

interface ITranslationMap {
    [index: string]: ITranslationMapItem;
}

export default ITranslationMap;
