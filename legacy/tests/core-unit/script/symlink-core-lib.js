const Path = require('path');
const Fs = require('fs');
const Rimraf = require('rimraf');

const PROJECT_ROOT = process.cwd();

const PATH_NODE_MODULES = Path.join(PROJECT_ROOT, 'node_modules');
const PATH_FTK_SCOPE = Path.join(PATH_NODE_MODULES, '@daimler');
const PATH_FTK_CORE = Path.join(PATH_FTK_SCOPE, 'ftk-core');

const REALPATH_FTK_CORE = Path.resolve(PROJECT_ROOT, '..', '..', 'core');

// # CLEAN UP

// Check if Module exists and delete it
if (Fs.existsSync(PATH_FTK_CORE)) {
  try {
    Rimraf.sync(PATH_FTK_CORE);
  } catch (error) {
    console.error('Can not delete module: ' + PATH_FTK_CORE);
    console.error(error);
  }
}
// Re-Check if it still exists, meaning it couldn't be deleted
if (Fs.existsSync(PATH_FTK_CORE)) {
  console.error('Can not delete module: ' + PATH_FTK_CORE);
  process.exit(1);
}

// # FOLDER PREPARATION

// Make scope folder
Fs.mkdirSync(PATH_FTK_SCOPE, { recursive: true });
// Check if folder exists, otherwise exit with error
if (!Fs.existsSync(PATH_FTK_SCOPE)) {
  console.error('Can not create scope folder: ' + PATH_FTK_SCOPE);
  process.exit(1);
}

// # CREATE SYMLINK
try {
  Fs.symlinkSync(REALPATH_FTK_CORE, PATH_FTK_CORE, 'dir');
  console.log('@daimler/ftk-core symlink created.');
} catch (error) {
  console.error('Can not create symlink.');
  process.exit(1);
}
