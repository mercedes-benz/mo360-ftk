// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  devtool: 'source-map',
  // we dynamically add swidgets entry points later on in the document (scroll down)
  entry: {},
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
  externals: {
    '@daimler/ftk-core': 'ExposedFtkCore',
    lodash: 'ExposedLodash',
    react: 'ExposedReact',
  },
  module: {
    rules: [
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
        /*
                include: [
                    fs.realpathSync(path.join(process.cwd(), 'src')),
                    fs.realpathSync(path.join(process.cwd(), 'test')),
                    fs.realpathSync(path.join(process.cwd(), 'node_modules')),
                ], */
        exclude: [fs.realpathSync(path.join(process.cwd(), 'node_modules', 'route-parser'))],
      },
    ],
  },
  devServer: {
    historyApiFallback: false,
    disableHostCheck: true,
    host: 'localhost',
    port: 8081,
    quiet: true,

    // Proxy some swidgets for asset path tests / deep linking where we need subfolder pathes
    proxy: {
      '/somewhere': {
        target: 'http://localhost:8081',
        pathRewrite: { '^/somewhere': '' },
      },
      '/deep': {
        target: 'http://localhost:8081',
        pathRewrite: { '^/deep': '' },
      },
    },
  },
};

/**
 * Add all swidgets for functional tests which require (dynamic) compilation as entry points
 */
const swidgets = [
  'ExampleSwidget',
  'ExternalEchoComponent',
  'ExternalComponentWithChildren',
  'SwidgetWithSubRoutes',
  'SwidgetWithTranslations',
  'SwidgetAssetLoading',
];
swidgets.map((name) => {
  config.entry[name] = path.join(__dirname, 'temp', 'fixture', 'functional', 'swidgets', `${name}.js`);
});

module.exports = config;
