// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

// DO NOT CHANGE THIS! This is a minimal set of exposed libraries that
// swidgets need to run. When removing exposed modules, swidgets might break.
const defaultExposedModules = {
  '@daimler/ftk-core': 'ExposedFtkCore',
  '@material-ui/core': 'ExposedMaterialUiCore',
  '@material-ui/lab': 'ExposedMaterialUiLab',
  '@material-ui/icons': 'ExposedMaterialUIIcons',
  '@material-ui/styles': 'ExposedMaterialUIStyles',
  react: 'ExposedReact',
  'react-dom': 'ExposedReactDom',
  inversify: 'ExposedInversify',
  'intl-pluralrules': 'ExposedIntlPluralrules',
  '@formatjs/intl-relativetimeformat/polyfill': 'ExposedIntlRelativetimeformatPolyfill',
  '@formatjs/intl-relativetimeformat/dist/locale-data/en': 'ExposedIntlRelativetimeformatLocaleDataEn',
  '@formatjs/intl-relativetimeformat/dist/locale-data/de': 'ExposedIntlRelativetimeformatLocaleDataDe',
};

/**
 *
 * Adds our list of exposed modules to a webpack { rules: [] } section to mark the to be loaded via
 * expose-loader.
 */
function addExposedModules(rulesArray, moduleMap) {
  Object.entries(moduleMap).map(([moduleName, exposedName]) => {
    if (moduleName.startsWith('@material-ui')) {
      // material-ui exceptions as they for some reason do not get parsed correctly
      if (moduleName === '@material-ui/core') {
        rulesArray.push({
          test: /@material-ui[\/\\]core[\/\\]*./,
          loader: 'expose-loader?ExposedMaterialUiCore',
        });
      } else if (moduleName === '@material-ui/lab') {
        rulesArray.push({
          test: /@material-ui[\/\\]lab[\/\\]*./,
          loader: 'expose-loader?ExposedMaterialUiLab',
        });
      } else if (moduleName === '@material-ui/icons') {
        rulesArray.push({
          test: /@material-ui[\/\\]icons[\/\\]*./,
          loader: 'expose-loader?ExposedMaterialUIIcons',
        });
      } else if (moduleName === '@material-ui/styles') {
        rulesArray.push({
          test: /@material-ui[\/\\]styles[\/\\]*./,
          loader: 'expose-loader?ExposedMaterialUIStyles',
        });
      }
    } else {
      try {
        const modulePath = require.resolve(moduleName);
        rulesArray.push({
          test: modulePath,
          loader: `expose-loader?${exposedName}`,
        });
      } catch (err) {
        if (err.hasOwnProperty('code') && err.code === 'MODULE_NOT_FOUND') {
          console.log(
            `[FTK] Host: Error exposing module '${moduleName}'. Module not found. Update '.build/exposed.modules.custom.js' if this is intentional.`,
          );
        } else {
          console.error(err);
          exit(1);
        }
      }
    }
  });
}

module.exports = { defaultExposedModules, addExposedModules };
