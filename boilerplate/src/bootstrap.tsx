// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import * as React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
import MyApp from './App';

/**
 * MS Edge Polyfill for URLSearchParams
 * (Remove once Edge has native URLSearchParams support)
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
global.URLSearchParams = require('@ungap/url-search-params');
/** End of polyfill */

const app = <MyApp />;
render(app, document.getElementById('root'));
export default Object.is(process.env.NODE_ENV, 'development') ? hot(module)(app) : app;
