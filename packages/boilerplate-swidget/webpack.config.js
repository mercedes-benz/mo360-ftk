// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

module.exports = function () {
  return require(`./.build/webpack/${process.env.build}.js`);
};
