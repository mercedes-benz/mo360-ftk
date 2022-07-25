// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { I18nService, inject, withInject } from '@daimler/ftk-core';
import * as React from 'react';

export interface IProps {
  className?: string;
  i18n?: I18nService;
  translationKeys?: string[];
}

class SampleTranslations extends React.Component<IProps, {}> {
  public static defaultProps: IProps = {
    className: 'translations',
    translationKeys: [],
  };

  @inject() private i18n: I18nService;

  public render() {
    return (
      <div>
        <input type="button" className="toggle-language" onClick={this.toggleLanguage} value="toggle language" />
        <div className={this.props.className}>
          {this.props.translationKeys.map((key, index) => {
            return (
              <div key={index} className="translation">
                {this.i18n.translateToString(key)}
              </div>
            );
          })}
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }

  private toggleLanguage = () => {
    this.i18n.setLang(this.i18n.getLang() === 'de' ? 'en' : 'de');
  };
}

export default withInject(SampleTranslations);
