// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const memoryFs = require('memory-fs');
const fs = new memoryFs();
const debug = require('debug')('server');
const app = express();
let port = 8080;
if (process.env['TEST_SERVER_PORT']) {
  port = Number.parseFloat(process.env['TEST_SERVER_PORT']);
}

/* simple caching middleware so we do not run webpack compiles over-and-over again */
const mcache = require('memory-cache');
const cache = (duration) => {
  return (req, res, next) => {
    const key = '__express__' + req.originalUrl || req.url;
    const cachedBody = mcache.get(key);
    if (req.method === 'GET' && cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

app.use(function (err, req, res) {
  debug(err);
  res.status(500);
  res.render('error', {
    error: err,
  });
});

app.get('*', cache(30), function (req, res, next) {
  const webpackConfig = {
    entry: {
      client: path.join(__dirname, 'client.js'),
      testComponent: [
        'babel-polyfill',
        path.join(__dirname, '..', '..', '..', 'temp', 'test', 'fixture', 'functional', path.basename(req.path)),
      ],
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
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
    module: {
      rules: [
        {
          test: require.resolve('react'),
          use: [
            {
              loader: 'expose-loader',
              options: 'React',
            },
          ],
        },
        // we need to transpile ALL our sources to ES5 as we can not guarantee that all dependencies at
        // any given time will not use unsupported features not present on IE11
        {
          test: (path) => {
            // router-parser can for some reason not be compiled with babel
            if (path.indexOf('route-parser') >= 0 && path.indexOf('compiled-grammar') >= 0) return false;

            const extension = path.substr(-3);
            // do not compile files other than .js
            if (extension === '.js') {
              return true;
            }
            // do not compile other types
            return false;
          },
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: [
                  [
                    'env',
                    {
                      targets: {
                        browsers: ['last 2 versions', 'ie >= 11'],
                      },
                    },
                  ],
                ],
              },
            },
          ],
        },
      ],
    },
  };

  const isRequestForExternalComponent = req.path.indexOf('/compiled/') === 0;
  let externalComponentId;
  if (isRequestForExternalComponent) {
    externalComponentId = path.basename(req.path).replace('.js', '');

    // exclude React from the external component bundle
    webpackConfig.externals = {
      react: 'React',
    };

    // bundle the externalComponent into the memory fs
    webpackConfig.entry[externalComponentId] = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'temp',
      'test',
      'fixture',
      'functional',
      req.path,
    );
  }

  const compiler = webpack(webpackConfig, function (err) {
    if (err) {
      next(err);
    }
  });

  compiler.outputFileSystem = fs;
  compiler.run(function (err) {
    if (err) {
      next(err);
    } else {
      try {
        if (isRequestForExternalComponent) {
          // serve external components as webpack bundles for hot-loading
          const extComponent = fs.readFileSync(path.join(__dirname, externalComponentId + '.js')).toString();
          res.set('Content-Type', 'text/javascript');
          res.send(extComponent);
        } else {
          const testComponent = fs.readFileSync(path.join(__dirname, 'testComponent.js')).toString();
          const client = fs.readFileSync(path.join(__dirname, 'client.js')).toString();

          res.send(
            '<!DOCTYPE html>' +
              '<html>' +
              '<head>' +
              '<meta charset="utf-8">' +
              '<title>Selenium Test</title>' +
              '</head>' +
              '<body>' +
              '<div id="test"></div>' +
              '<script>' +
              testComponent +
              '</script>' +
              '<script>' +
              client +
              '</script>' +
              '</body>' +
              '</html>',
          );
        }
      } catch (err) {
        next(err);
      }
    }
  });
});

app.listen(port, function () {
  debug('Express server listening on port ' + port);
});
