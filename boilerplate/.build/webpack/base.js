// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

const path = require('path'),
  fs = require('fs'),
  htmlWebpackPlugin = require('html-webpack-plugin'),
  camelCase = require('camelcase'),
  packageJson = require(path.resolve(process.cwd(), 'package.json')),
  webpack = require('webpack'),
  miniCssExtractPlugin = require('mini-css-extract-plugin'),
  copyWebpackPlugin = require('copy-webpack-plugin'),
  devMode = process.env.build === 'dev',
  packageName = camelCase(packageJson.name.replace(/@/, '-').replace(/\//, '-')),
  version = packageJson.version.toLowerCase().trim(),
  title = packageJson.config.title || packageName;

const base = {
  target: 'web',
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, '../../dist/app'),
    filename: devMode ? 'app.js' : `${packageName}_${version}_[name].js`,
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: 'bundle-loader',
        options: {
          lazy: true,
        },
      },
      {
        test: /\.(ttf|eot|woff2|woff|svg|otf)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1025,
              name: 'fonts/[name]-[hash:base64:5].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1025,
              name: 'images/[name]-[hash:base64:5].[ext]',
            },
          },
        ],
      },
      // project css files
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: devMode ? 'style-loader' : miniCssExtractPlugin.loader,
          },
          {
            loader: 'css-modules-typescript-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                hashPrefix: 'ftk-' + Date.now(),
                localIdentName: '[name]_[local]_[hash:base64:5]',
              },
              importLoaders: 1,
              sourceMap: true,
              localsConvention: 'camelCase',
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
        include: [path.resolve(__dirname, path.join('..', '..', 'src'))],
      },
      // node_module css files
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
        exclude: [path.resolve(__dirname, path.join('..', '..', 'src'))],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.png', '.svg', '.jpg', '.gif'],
    fallback: {
      fs: false,
      net: false,
      tls: false,
      dns: false,
    }
  },
  plugins: [
    new webpack.WatchIgnorePlugin({
      paths: [/css\.d\.ts$/]
    }),
    new webpack.DefinePlugin({
      __CONFIG__: process.env.config ? JSON.stringify(process.env.config) : JSON.stringify('default'),
      __DEV__: devMode,
      'process.env.NODE_ENV': devMode ? JSON.stringify('development') : JSON.stringify('production'),
    }),
    new htmlWebpackPlugin({
      lang: 'en',
      title: (devMode ? 'DEV | ' : '') + title,
      template: path.join(__dirname, '..', '..', 'src', 'assets', 'templates', 'default.ejs'),
      appMountId: 'root',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: false,
        minifyCSS: true,
        minifyJS: true,
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'application-name', content: packageName },
        { name: 'application-version', content: version },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
        { content: 'ie=edge', 'http-equiv': 'x-ua-compatible' },
      ],
      chunksSortMode: function (chunk1, chunk2) {
        var orders = ['polyfill', 'app'];
        var order1 = orders.indexOf(typeof chunk1 === 'string' ? chunk1 : chunk1.names[0]);
        var order2 = orders.indexOf(typeof chunk2 === 'string' ? chunk2 : chunk2.names[0]);
        if (order1 > order2) {
          return 1;
        } else if (order1 < order2) {
          return -1;
        } else {
          return 0;
        }
      },
    }),
    new miniCssExtractPlugin({
      filename: `${packageName}_${version}.css`,
    }),
    //async await support in es6
    new webpack.ProvidePlugin({
      regeneratorRuntime: 'regenerator-runtime/runtime',
    })
  ],
};

// copy public files
const pathPublic = path.join(process.cwd(), 'public');
function publicFolderHasFiles() {
  if (fs.existsSync(pathPublic)) {
    try {
      const listFiles = fs.readdirSync(pathPublic);
      for (let i = 0; i < listFiles.length; i += 1) {
        if (listFiles[i] !== 'README.md') {
          return true;
        }
      }
    } catch (_) {}
  }
  return false;
}
if (publicFolderHasFiles()) {
  base.plugins.push(
    new copyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: pathPublic,
          globOptions: { ignore: ['**/README.md'] },
        },
      ],
    }),
  );
}

module.exports = base;
