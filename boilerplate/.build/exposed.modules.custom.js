// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

// You can specify a list of npm modules that should be bundled into the Host
// application. The module will be available as global variable on window - i.e. window.ExposedLodash
// Swidgets will skip bundling these, if build with the exact same configuration as specified
// here

// Format: { 'modulename': 'VariableName' }
// i.e.:
// module.exports = { 'lodash': 'ExposedLodash' }
// to make lodash available to all swidgets
module.exports = {
  // '@foo/bar': 'ExposedFooBar',
};
