// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { IDiContainer, IRouteConfig, ISwidget, Route, serviceIds, App, TranslationProvider } from '@daimler/ftk-core';
import * as React from 'react';
import TranslationsI18n from './globals/i18n/Translations';
import routes from './routes';

/* eslint-disable @typescript-eslint/no-var-requires */
const config = require(`../config/${__CONFIG__}`).default;
/* eslint-enable @typescript-eslint/no-var-requires */

function init(container: IDiContainer): void {
  container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue(routes);
}

// Create your custom MUI Theme here or import it
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#676767',
      main: '#222222',
      dark: '#222222',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#5097AB',
      main: '#00677F',
      dark: '#003340',
      contrastText: '#FFFFFF',
    },
  },
});

const swidget: ISwidget = (): JSX.Element => {
  return (
    <App name="My-App" init={init} config={config}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline>
          <TranslationProvider translations={TranslationsI18n}>
            <Route />
          </TranslationProvider>
        </CssBaseline>
      </MuiThemeProvider>
    </App>
  );
};

swidget.metadata = {
  authors: [],
  description: 'My-App Swidget',
};

export default swidget;
