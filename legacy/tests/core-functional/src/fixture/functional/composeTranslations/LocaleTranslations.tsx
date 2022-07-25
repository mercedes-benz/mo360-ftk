// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { I18nService, inject, withInject } from '@daimler/ftk-core';
import * as React from 'react';

class LocaleTranslations extends React.Component<{}, {}> {
  @inject() private i18n: I18nService;

  public render() {
    return <div className="translation">{this.i18n.translate('LOCALE1', { name: 'Eric', unreadCount: 1000 })}</div>;
  }
}

export default withInject(LocaleTranslations);
