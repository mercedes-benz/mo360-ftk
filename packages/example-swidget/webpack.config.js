// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

module.exports = function () {
  return require(`./.build/webpack/${process.env.build}.js`);
};
