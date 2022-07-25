// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { Registry } from '../../../util/Registry';
import IMessage from './IMessage';

interface ITranslation {
    translationId: string;
    messages: Registry<IMessage>;
}

export default ITranslation;
