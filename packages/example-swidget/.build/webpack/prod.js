// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

const base = require('./base'),
  merge = require('webpack-merge'),
  path = require('path'),
  terserPlugin = require('terser-webpack-plugin'),
  cssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
  SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin'),
  sourceMapGeneration =
    process.env.sourceMap === 'true'
      ? 'source-map'
      : process.env.sourceMap === 'false'
      ? false
      : process.env.sourceMap
        ? process.env.sourceMap
        : false;

const prodConfig = {
  name: 'ProdConfig',
  mode: 'production',
  devtool: sourceMapGeneration,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(process.cwd(), 'tsconfig.json'),
            },
          },
        ],
        exclude: [path.resolve(process.cwd(), 'stories'), path.resolve(process.cwd(), 'test')],
      },
    ],
  },
  plugins: [
    new SimpleProgressWebpackPlugin({
      format: process.env.verbose === 'true' ? 'expanded' : 'compact',
    }),
  ],
  optimization: {
    minimizer: [
      new terserPlugin({
        extractComments: true,
        parallel: true,
        terserOptions: {
          safari10: true,
        },
      }),
      new cssMinimizerPlugin(),
    ],
  },
  stats: process.env.verbose === 'true' ? 'normal' : 'errors-only',
};

module.exports = merge(base, prodConfig);
