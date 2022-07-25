// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import * as React from 'react';
import { injectIntl, IntlProvider } from 'react-intl';
import { ConfigService } from '../../config/lib/ConfigService';
import singleton from '../../di/hoc/singleton';
import withInject, { IWithDiProps } from '../../di/hoc/withInject';
import Provider from './I18nProvider';

// tslint:disable
import 'intl-pluralrules';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/locale-data/de'; // Add locale data for de
import '@formatjs/intl-relativetimeformat/locale-data/en'; // Add locale data for en
// tslint:enable

interface IWrapperState {
  defaultLocale?: string;
}

/**
 * This wrapper is mainly needed as the injectIntl() requires the defaultLocale to be set on
 * construction. So we have to know outside our Provider what locale to use before we can wrap it.
 */
class IntlProviderWrapper extends React.Component<IWithDiProps, IWrapperState> {
  public static getDerivedStateFromProps(nextProps: IWithDiProps, prevState: IWrapperState) {
    if (!prevState.defaultLocale) {
      let defaultLocale = 'en';
      try {
        defaultLocale = nextProps.container.get(ConfigService).getConfig().core.i18n.defaultLocale;
      } catch (err) {
        console.warn(`Warning: no defaultLocale found in config - using '${defaultLocale}' as fallback`);
      }
      return { ...prevState, defaultLocale };
    } else {
      return prevState;
    }
  }

  public state: IWrapperState = {
    defaultLocale: undefined,
  };

  public render() {
    const I18nProvider = withInject(injectIntl(Provider));
    return (
      <IntlProvider locale={this.state.defaultLocale} defaultLocale={this.state.defaultLocale}>
        <I18nProvider setLang={this.setLang} lang={this.state.defaultLocale}>
          {this.props.children}
        </I18nProvider>
      </IntlProvider>
    );
  }

  private setLang = (lang: string) => {
    this.setState((prevState) => ({ ...prevState, defaultLocale: lang }));
  };
}

export default singleton('ftk.core.intlwrapper', withInject(IntlProviderWrapper));
