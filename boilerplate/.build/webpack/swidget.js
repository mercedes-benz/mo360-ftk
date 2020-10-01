// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

const merge = require('webpack-merge'),
  path = require('path'),
  camelCase = require('camelcase'),
  packageJson = require(path.resolve(process.cwd(), 'package.json')),
  nameLibrary = camelCase(packageJson.name.replace(/@/, '-').replace(/\//, '-')),
  defaultExposedModules = require('./exposed.modules').defaultExposedModules,
  customExposedModules = require('../exposed.modules.custom');

const swidgetConfig = {
  entry: [path.resolve(process.cwd(), 'src', 'App.tsx')],
  output: {
    library: nameLibrary,
    libraryTarget: 'var',
    path: path.resolve(__dirname, '../../dist/swidget'),
  },
  plugins: [],
  // These are provided by the Host app and are marked as external
  // so they don't get bundled into the swidget
  externals: {
    ...defaultExposedModules,
    ...customExposedModules,
  },
};

module.exports = swidgetConfig;
