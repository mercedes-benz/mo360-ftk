'use strict';
/* eslint-disable @typescript-eslint/no-var-requires */

const Path = require('path');
const Fs = require('fs');
const Rimraf = require('rimraf');
const Copyfiles = require('copyfiles');

// Resolve paths
const PROJECT_ROOT = process.cwd();
const FOLDER = 'boilerplate';
const PATH_LIB = Path.join(PROJECT_ROOT, FOLDER);
const PATH_SOURCE = Path.resolve(PROJECT_ROOT, '..', FOLDER);

// # CLEAN UP

// Check if /lib/ exists and delete it
if (Fs.existsSync(PATH_LIB)) {
  try {
    Rimraf.sync(PATH_LIB);
  } catch (error) {
    console.error('Can not delete /lib/: ' + PATH_LIB);
    console.error(error);
  }
}
// Re-Check if it still exists, meaning it couldn't be deleted
if (Fs.existsSync(PATH_LIB)) {
  console.error('Can not delete /lib/: ' + PATH_LIB);
  process.exit(1);
}

// # FOLDER PREPARATION

// Make /lib/ folder
Fs.mkdirSync(PATH_LIB, { recursive: true });
// Check if folder exists, otherwise exit with error
if (!Fs.existsSync(PATH_LIB)) {
  console.error('Can not create /lib/: ' + PATH_LIB);
  process.exit(1);
}

// # COPY FILES

// Prepare input path
const PATH_REL_SOURCE = Path.relative(PROJECT_ROOT, PATH_SOURCE);
const PATH_INPUT = Path.join(PATH_REL_SOURCE, '**');
// Define folders and files to be excluded
const excludeFolders = ['.rush', 'dist', 'node_modules', 'temp', 'coverage', 'errorShots'];
const excludeFiles = ['.DS_Store', '*.log'];
// Prepare exclude
const globExcludeFolder = excludeFolders
  .map((folder) => [
    Path.join(PATH_REL_SOURCE, folder),
    Path.join(PATH_REL_SOURCE, folder, '*'),
    Path.join(PATH_REL_SOURCE, folder, '**'),
  ])
  .reduce((acc, val) => [...acc, ...val], []);
const globExcludeFiles = excludeFiles
  .map((file) => [Path.join(PATH_REL_SOURCE, file), Path.join(PATH_REL_SOURCE, '**', file)])
  .reduce((acc, val) => [...acc, ...val], []);
const globExclude = [].concat(globExcludeFolder).concat(globExcludeFiles);
// Prepare copy options
const options = {
  exclude: globExclude,
  up: 1,
  all: true,
  // verbose: true,
};
// Copy
Copyfiles([PATH_INPUT, PROJECT_ROOT], options, (error) => {
  if (error) {
    console.log('Error copying files');
    console.error(error);
    process.exit(1);
  } else {
    console.log('All files copied!');
    process.exit(0);
  }
});
