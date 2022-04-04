// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

const breakpoints = [320, 480, 575, 599, 736, 768, 839, 980, 992, 1024, 1200, 1280, 1366, 1440, 1690, 1920];

const queries = {
  retina:
    '(-webkit-min-device-pixel-ratio:1.5), (min--moz-device-pixel-ratio:1.5), (-o-min-device-pixel-ratio:3/2), (min-resolution:1.5dppx)',
};

breakpoints.map((bp) => {
  queries[`lt-${bp}`] = `(width < ${bp}px)`;
  queries[`lte-${bp}`] = `(width <= ${bp}px)`;
  queries[`eq-${bp}`] = `(${bp}px <= width <= ${bp}px)`;
  queries[`gte-${bp}`] = `(width >= ${bp}px)`;
  queries[`gt-${bp}`] = `(width > ${bp}px)`;
});

module.exports = queries;
