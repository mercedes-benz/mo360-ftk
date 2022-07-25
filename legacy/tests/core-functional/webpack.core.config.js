// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  devtool: 'source-map',
  entry: {
    tests: ['@babel/polyfill', path.join(__dirname, 'temp', 'fixture', 'functional', 'index.js')],
    // we dynamically add swidgets entry points later on in the document (scroll down)
  },
  output: {
    filename: '[name].js',
    path: __dirname,
    library: '[name]',
    libraryTarget: 'var',
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: require.resolve('@daimler/ftk-core'),
        loader: 'expose-loader?ExposedFtkCore',
      },
      {
        test: require.resolve('react'),
        loader: 'expose-loader?ExposedReact',
      },
      {
        test: require.resolve('lodash'),
        loader: 'expose-loader?ExposedLodash',
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env'],
            },
          },
        ],
        exclude: [fs.realpathSync(path.join(process.cwd(), 'node_modules', 'route-parser'))],
      },
    ],
  },
  devServer: {
    historyApiFallback: false,
    disableHostCheck: true,
    host: 'localhost',
    port: 8080,
    quiet: true,
  },
};

module.exports = config;
