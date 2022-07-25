// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

const postcssPresetEnv = require('postcss-preset-env');
const postcssPluginUnprefix = require('postcss-unprefix');
const postcssPluginRemovePrefixes = require('postcss-remove-prefixes');
const postcssPluginSorting = require('postcss-sorting');
const postcssNested = require('postcss-nested');
const postcssImport = require('postcss-import');
const postcssExtend = require('postcss-extend');

const cssCustomProperties = require('./.build/postcss/cssCustomProperties');
const customMediaQueries = require('./.build/postcss/customMediaQueries');

const pluginsForSourceFiles = [
  postcssImport(),
  postcssPluginUnprefix(),
  postcssPluginRemovePrefixes(),
  postcssPluginSorting({
    order: ['custom-properties', 'dollar-variables', 'declarations', 'at-rules', 'rules'],
    'properties-order': 'alphabetical',
    'unspecified-properties-position': 'bottom',
  }),
];

const pluginsForBuildFiles = pluginsForSourceFiles.concat([
  postcssNested(),
  postcssExtend(),
  postcssPresetEnv({
    stage: 1,
    features: {
      'custom-properties': {
        importFrom: '.build/postcss/cssCustomProperties.js',
      },
      'custom-media-queries': {
        extensions: customMediaQueries,
      },
    },
  }),
]);

const isBuildMode = process.env.build === 'dev' || process.env.build === 'prod' || process.env.build === 'multi';

module.exports = {
  plugins: isBuildMode ? pluginsForBuildFiles : pluginsForSourceFiles,
};
