// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { composeTranslations, I18nService, inject, ISwidget, ITranslationMap, App } from '@daimler/ftk-core';
import * as React from 'react';

export interface IProps {
  i18n?: I18nService;
}

const swidgetTranslations: ITranslationMap = {
  de: {
    SWIDGET_MESSAGE: 'swidget-message-de',
  },
  en: {
    SWIDGET_MESSAGE: 'swidget-message-en',
  },
};

class SwidgetWithTranslations extends React.Component<IProps, {}> {
  @inject() private i18n: I18nService;

  public render() {
    return (
      <App name="SwidgetWithTranslations">
        <h1 className="swidget-message">{this.i18n.translateToString('SWIDGET_MESSAGE')}</h1>
      </App>
    );
  }
}

const SwidgetComponent = composeTranslations(SwidgetWithTranslations, swidgetTranslations);

const swidget: ISwidget = () => {
  return <SwidgetComponent />;
};
swidget.metadata = {};

export default swidget;
