// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import * as React from 'react';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
import MyApp from './App';

const app = <MyApp />;
render(app, document.getElementById('root'));
export default Object.is(process.env.NODE_ENV, 'development') ? hot(module)(app) : app;
