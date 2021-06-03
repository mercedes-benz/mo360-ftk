// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

const merge = require('webpack-merge');

module.exports = function () {
  const env = process.env;
  let config = require(`./.build/webpack/${env.build}.js`);

  if (env.swidget === 'true') {
    config = merge(config, require(`./.build/webpack/swidget.js`));
  }

  return config;
};
