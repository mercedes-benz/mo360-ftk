// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

var fs = require('fs');
var cssjson = require('cssjson');

var cssCustomProps = {};
var cssPaths = ['../../src/globals/css/css-custom-properties.css'];

for (var i = 0, l = cssPaths.length, cssPath, cssFilename, cssFile, cssObj; i < l; i++) {
  cssPath = cssPaths[i];
  try {
    cssFilename = require.resolve(cssPath);
    if (fs.existsSync(cssFilename)) {
      cssFile = fs.readFileSync(cssFilename, 'utf8');
      cssObj = cssjson.toJSON(cssFile);

      if (cssObj.hasOwnProperty('children')) {
        for (var rootChild in cssObj.children) {
          if (cssObj.children.hasOwnProperty(rootChild)) {
            if (rootChild === ':root') {
              if (cssObj.children[':root'].hasOwnProperty('attributes')) {
                var attributes = cssObj.children[':root'].attributes;
                for (var property in attributes) {
                  if (attributes.hasOwnProperty(property)) {
                    var iStart = property.indexOf('--');
                    if (iStart >= 0) {
                      cssCustomProps[property.substr(iStart)] = attributes[property];
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  } catch (e) {
    console.log('[41m %s [0m %s', 'CSS-Custom-Properties', 'Cannot load "' + cssPath + '" (File not found)');
  }
}

module.exports = { customProperties: cssCustomProps };
