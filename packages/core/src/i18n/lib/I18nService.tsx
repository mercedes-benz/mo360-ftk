// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import * as React from 'react';
import { FormattedMessage, IntlShape } from 'react-intl';
import { Registry } from '../../util/Registry';
import ITranslation from './interface/ITranslation';

export class I18nService {
  constructor(
    private registry: Registry<ITranslation>,
    private langGetter: () => string,
    private langSetter: (lang: string) => void,
    private intl: IntlShape,
  ) {}

  public translate(translationId: string, params: object = {}): JSX.Element | string {
    try {
      const message = this.registry.get(translationId);

      return (
        <FormattedMessage
          id={message.translationId}
          defaultMessage={message.messages.get(this.getLang()).message}
          values={params}
        />
      );
    } catch (e) {
      return translationId;
    }
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  public translateToString(translationId: string, params: any = {}): string {
    /* eslint-enable @typescript-eslint/no-explicit-any */
    try {
      const message = this.registry.get(translationId);
      return this.intl.formatMessage(
        {
          defaultMessage: message.messages.get(this.getLang()).message,
          id: message.translationId,
        },
        params,
      );
    } catch (e) {
      return translationId;
    }
  }

  public setLang(lang: string) {
    this.langSetter(lang);
  }

  public getLang() {
    return this.langGetter();
  }

  public getLangs() {
    try {
      const keyZero = this.registry.getKeys()[0];
      if (this.registry.has(keyZero)) {
        return this.registry.get(keyZero).messages.getKeys();
      }
      return [];
    } catch (e) {
      return [];
    }
  }
}
