// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { I18nService, inject, withInject } from '@daimler/ftk-core';
import * as React from 'react';
import { TestSwidgetLoader } from '../ComponentLoader';

export interface IProps {
  i18n?: I18nService;
}

class ToggleLanguage extends React.Component<IProps> {
  @inject() private i18n: I18nService;

  public toggleLanguage = () => {
    const currentLang = this.i18n.getLang();
    this.i18n.setLang(currentLang === 'de' ? 'en' : 'de');
  };

  public render() {
    return (
      <>
        <input type="button" className="toggle-language" onClick={this.toggleLanguage} value="toggle language" />
        <TestSwidgetLoader name="SwidgetWithTranslations" />
      </>
    );
  }
}

export default withInject(ToggleLanguage);
