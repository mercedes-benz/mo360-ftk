"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const pathRushLib = path.resolve(__dirname, '..', 'autoinstallers', 'rush-package-lock', 'node_modules', '@microsoft', 'rush-lib');
const rushLib = require(pathRushLib);
const pathYamlLib = path.resolve(__dirname, '..', 'autoinstallers', 'rush-package-lock', 'node_modules', 'js-yaml');
const yaml = require(pathYamlLib);
const fs = require('fs');

// Get Rush Config
const rushConfiguration = rushLib.RushConfiguration.loadFromDefaultLocation({
  startingFolder: process.cwd()
});

console.log('Create package-lock.json files for projects:');

function getBaseLockJson(project) {
  return {
    name: project.packageJson.name,
    version: project.packageJson.version,
    lockfileVersion: 1,
    requires: true,
    dependencies: {}
  };
}

function getLockFileDependencies(lockFile, packageName) {
  try {
    return lockFile.packages[packageName].dependencies;
  } catch (_) {
    return {};
  }
}

function sanitizeVersion(version) {
  const idx = version.indexOf('_');
  if (idx > 0) {
    return version.substring(0, idx);
  }
  return version;
}

function addDependencyToMap(map, name, version) {
  if (!map.has(name)) {
    map.set(name, { _version: version, version: sanitizeVersion(version) });
  }
}

function addDependenciesToMap(map, list) {
  for (const name in list) {
    if (Object.prototype.hasOwnProperty.call(list, name)) {
      addDependencyToMap(map, name, list[name]);
    }
  }
}

function writeJsonSync(filename, obj) {
  return fs.writeFileSync(filename, JSON.stringify(obj, null, 2) + '\n', 'utf8')
}

// Load lock file
if(!fs.existsSync(rushConfiguration.tempShrinkwrapFilename)) {
  console.error('No Rush lock file found. Be sure to run "rush install" before.');
  process.exit(1);
}
try {
  const pnpmLock = yaml.safeLoad(fs.readFileSync(rushConfiguration.tempShrinkwrapFilename, 'utf8'));
  // console.log(pnpmLock);

  // Loop through Rush projects
  for (const project of rushConfiguration.projects) {
    console.log('- ' + project.packageName);

    // prepare base lock json content
    const lockJsonContent = getBaseLockJson(project);

    // prepare dependency map
    const depMap = new Map();

    // get direct dependencies
    const projectIdentifier = `file:projects/${project.unscopedTempProjectName}.tgz`;
    const directDependencies = getLockFileDependencies(pnpmLock, projectIdentifier);
    addDependenciesToMap(depMap, directDependencies);

    // recursive resolve subdependencies
    let resolved = false;
    while(!resolved) {
      resolved = true;
      for (const [name, obj] of depMap) {
        if (!Object.prototype.hasOwnProperty.call(obj, 'requires')) {
          resolved = false;
          const dependencyIdentifier = `/${name}/${obj._version}`;
          const subDependencies = getLockFileDependencies(pnpmLock, dependencyIdentifier);
          depMap.set(name, {
            ...obj,
            requires: subDependencies || {},
          });
          addDependenciesToMap(depMap, subDependencies);
        }
      }
    }

    // add dependencies to json output
    lockJsonContent.dependencies = Object.fromEntries(depMap);

    // write package-lock.json
    const pathLockFile = path.join(project.projectFolder, 'package-lock.json');
    writeJsonSync(pathLockFile, lockJsonContent);
  }

} catch (e) {
  console.error('Error parsing lock file.');
  console.log(e);
  process.exit(1);
}

process.exit(0);
