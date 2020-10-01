'use strict';
/* eslint-disable @typescript-eslint/no-var-requires */
const Path = require('path');
const Fs = require('fs');
const Copyfiles = require('copyfiles');
const ReplaceInFile = require('replace-in-file');

// Resolve paths
// process.cwd() = <PROJECT_ROOT>/node_modules/@daimler/ftk-boilerplate
const PATH_CWD = process.cwd();
const PATH_LIB = Path.join(PATH_CWD, 'boilerplate');
const PATH_PROJECT = Path.resolve(PATH_CWD, '..', '..', '..');
const PATH_REL_PROJECT = Path.relative(PATH_CWD, PATH_PROJECT);
const PATH_REL_LIB = Path.relative(PATH_CWD, PATH_LIB);

// # CHECK BOILERPLATE (this has to be a strange issue)
const PATH_BOILERPLATE_PACKAGE_JSON = Path.join(PATH_CWD, 'package.json');
if (!Fs.existsSync(PATH_BOILERPLATE_PACKAGE_JSON)) {
  console.error('Can not find package.json in "%s"', PATH_CWD);
  process.exit(1);
}

// # CHECK PROJECT
const PATH_PROJECT_PACKAGE_JSON = Path.join(PATH_PROJECT, 'package.json');
const PATH_PROJECT_PACKAGE_LOCK_JSON = Path.join(PATH_PROJECT, 'package-lock.json');
if (!Fs.existsSync(PATH_PROJECT_PACKAGE_JSON) && !Fs.existsSync(PATH_PROJECT_PACKAGE_LOCK_JSON)) {
  // Exit gracefully since this is not running in an project
  process.exit(0);
}

// Read project package.json
const rawPackageJson = Fs.readFileSync(PATH_PROJECT_PACKAGE_JSON);
const packageJson = JSON.parse(rawPackageJson);

// Check if already installed
if (packageJson.boilerplate) {
  // Exit gracefully since installation already happened
  process.exit(0);
}

// Check if project empty (no other dependencies installed yet)
if (packageJson.dependencies) {
  for (const prop in packageJson.dependencies) {
    if (Object.prototype.hasOwnProperty.call(packageJson.dependencies, prop)) {
      console.error('Not a new project! There are "dependencies" listed in your package.json.');
      process.exit(1);
    }
  }
}
if (packageJson.devDependencies) {
  for (const prop in packageJson.devDependencies) {
    if (Object.prototype.hasOwnProperty.call(packageJson.devDependencies, prop)) {
      console.error('Not a new project! There are "devDependencies" listed in your package.json.');
      process.exit(1);
    }
  }
}

// # GATHER META DATA
const originalName = packageJson.name;
const originalVersion = packageJson.version;
const originalAuthor = packageJson.author || '';
const originalDescription = packageJson.description || '';
const originalLicense = packageJson.license || 'MIT';

// # GATHER BOILERPLATE META
const rawBoilerplatePackageJson = Fs.readFileSync(PATH_BOILERPLATE_PACKAGE_JSON);
const boilerplatePackageJson = JSON.parse(rawBoilerplatePackageJson);

// # COPY FILES

// Prepare input path
const PATH_INPUT = Path.join(PATH_REL_LIB, '**');
const PATH_OUTPUT = PATH_REL_PROJECT;
// Prepare copy options
const options = {
  exclude: ['boilerplate'],
  up: 1,
  all: true,
  verbose: false,
};
// Copy
Copyfiles([PATH_INPUT, PATH_OUTPUT], options, (error) => {
  if (error) {
    console.log('Error copying boilerplate files!');
    console.error(error);
    process.exit(1);
  } else {
    // Restore package.json fields
    const optionsPackageJson = {
      files: PATH_PROJECT_PACKAGE_JSON,
      from: [
        /"name": ".+",/,
        /"version": ".+",/,
        /"description": ".+",/,
        /"license": ".+",/,
        /"author": ".+",/,
        /,(?:\n|\r)+?\s+"repository": {(?:.|\n)*?},/,
      ],
      to: [
        `"name": "${originalName}",`,
        `"version": "${originalVersion}",`,
        `"description": "${originalDescription}",`,
        `"license": "${originalLicense}",`,
        `"author": "${originalAuthor}",`,
        `,
"boilerplate": {
  "boilerplate": "${boilerplatePackageJson.name}",
  "version": "${boilerplatePackageJson.version}"
},`,
      ],
    };
    const optionsLockJson = {
      files: PATH_PROJECT_PACKAGE_LOCK_JSON,
      from: [/"name": ".+",/, /"version": ".+",/],
      to: [`"name": "${originalName}",`, `"version": "${originalVersion}",`],
    };

    try {
      ReplaceInFile.sync(optionsPackageJson);
      ReplaceInFile.sync(optionsLockJson);
    } catch (error) {
      console.log('Error updating "package.json"!');
      console.error(error);
      process.exit(1);
    }

    process.exit(0);
  }
});
