// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

module.exports = {
  '**/*.{js,jsx,ts,tsx}': (filenames) => [
    `eslint --fix --ext ts,tsx ${filenames.join(' ')}`,
    `git add ${filenames.join(' ')}`,
  ],

  '**/*.{css,scss,sass,less}': (filenames) => [
    `postcss --config postcss.config.js --env sort-only --no-map --replace ${filenames.join(' ')}`,
    `prettier --write ${filenames.join(' ')}`,
    `git add ${filenames.join(' ')}`,
  ],

  '**/*.{json,md,html}': (filenames) => [`prettier --write ${filenames.join(' ')}`, `git add ${filenames.join(' ')}`],
};
