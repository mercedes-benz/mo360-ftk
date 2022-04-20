const Path = require('path');
const Fs = require('fs');
const Ncp = require('ncp').ncp;

const PROJECT_ROOT = process.cwd();

const PATH_NODE_MODULES = Path.join(PROJECT_ROOT, 'node_modules');
const PATH_FTK_SCOPE = Path.join(PATH_NODE_MODULES, '@daimler');
const PATH_FTK_CORE = Path.join(PATH_FTK_SCOPE, 'ftk-core');
const PATH_FTK_CORE_LIB = Path.join(PATH_FTK_CORE, 'lib');

const REALPATH_FTK_CORE = Path.resolve(PROJECT_ROOT, '..', '..', 'core');
const REALPATH_FTK_CORE_LIB = Path.join(REALPATH_FTK_CORE, 'lib');

// # CLEAN UP

// Check if Module exists and delete (unlink) it
if (Fs.existsSync(PATH_FTK_CORE)) {
  Fs.unlinkSync(PATH_FTK_CORE);
}
// Re-Check if it still exists, meaning it couldn't be deleted (unlinked)
if (Fs.existsSync(PATH_FTK_CORE)) {
  console.error('Can not delete module: ' + PATH_FTK_CORE);
  process.exit(1);
}

// # FOLDER PREPARATION

// Make lib folder
Fs.mkdirSync(PATH_FTK_CORE, { recursive: true });
// Check if folder exists, otherwise exit with error
if (!Fs.existsSync(PATH_FTK_CORE)) {
  console.error('Can not create lib folder: ' + PATH_FTK_CORE);
  process.exit(1);
}

// # COPY LIBRARY
Ncp(REALPATH_FTK_CORE_LIB, PATH_FTK_CORE_LIB, function (error) {
  if (error) {
    console.error("Can not copy lib from '" + REALPATH_FTK_CORE_LIB + "' to '" + PATH_FTK_CORE_LIB + "'.");
    console.error(error);
    process.exit(1);
  }
  console.log('@daimler/ftk-core library copied.');
});
