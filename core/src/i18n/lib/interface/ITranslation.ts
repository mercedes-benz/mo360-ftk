// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { Registry } from '../../../util/Registry';
import IMessage from './IMessage';

interface ITranslation {
    translationId: string;
    messages: Registry<IMessage>;
}

export default ITranslation;
