# Developing

> This guide is for the developing process of the FTK itself.  
> If you are developing an WebApp using the FTK then please head to the [Docs](docs/README.md).

---

## Getting started

### Prerequisites

* This repository relies on [Node.js](https://nodejs.org) and is currently restricted to `lts/dubnium`.
  Make sure you have a corresponding Node version running.
  For convenience we recommend the use of tools like [nvm](https://github.com/nvm-sh/nvm) to install specific Node versions.

* This repository uses [Rush](https://rushjs.io) to manage dependencies, bump versions and to publish the individual npm packages.
  If you want to contribute or develop the FTK make sure to read the [Rush Docs](https://rushjs.io/pages/intro/welcome/).

  Rush works best when globally installed:

  ```sh
  npm install -g @microsoft/rush
  ```

### Installation

1. Start with cloning the repository

2. In the projects root folder install and link all dependencies

    ```sh
    rush install
    rush build
    ```

## What and Where

The folders and their content briefly explained:

* [boilerplate](boilerplate/): Source files for the boilerplate
* [boilerplate-deployment](boilerplate-deployment/): Rigging project with takes the boilerplate source files from [boilerplate](boilerplate/) and packs them in the npm module called `@daimler/ftk-boilerplate`
* [common](common/): These are Rush specific files for managing this repository
* [core](core/): This is heart of the FTK. These files are packed as the npm module called `@daimler/ftk-core`
* [docs](docs/): Documentation for the FTK usage
* [tests](tests/): Test projects for unit and functional testing of the other packages

**Happy coding!**

### Core Development

In order to develop more easy on the `core` with direct visiblity in a web project you have to link it.

```bash
# For example: we use boilerplate and core
(
    cd core
    npm i
    # Creates link for the core itself
    npm link
)
(
    cd boilerplate
    npm i
    # link the core from the step before
    npm link @daimler/ftk-core
)
(
    cd core
    # Last step: link the used react version from your webapp. Otherwise we would have multiple react versions.
    npm link ../boilerplate/node_modules/react
)

# Now you can start the core in watch to auto compile
(cd core && npm run watch)
# Hotloading will work in the webapp directly
(cd boilerplate && npm run start)

# Happy developing!
```

## Package publishing on npm

In addition to the npm publish we want to make sure that we have a corresponding GitHub release tag, an intact repository and a meaningful `CHANGELOG.md`.
That's why there are a few steps to go through.

### Preparation

Once the coding / bug fixing / improving / etc. is done and all changes have been committed, the integrity of the repository has to be verified.
This can be one by rebuilding everything from a clean (uncached) state. Enter the following commands (one by one):

```sh
rush clean
rush purge
rush install
rush build
rush test
```

If all those commands execute without any errors the repository is fine and a new version of the packages can be published.

### Increment version

This is handled by Rush using the [`rush version`](https://rushjs.io/pages/commands/rush_version/) command.

```sh
rush version --bump
```

By default this command makes a `patch` increase in the version number.
Different increment steps, can be provided by using the `--override-bump` parameter.
Valid BUMPTYPE values include: `prerelease`, `patch`, `minor`, `major`.

```sh
rush version --bump --override-bump BUMPTYPE
```

### GitHub release tag

The previous command changes (and maybe created) some files which needs to be added to release (and git of course).
Next thing is to create a release commit, preferably with the version as git message:

```sh
git commit -m "1.2.3"
```

And a git tag:

```sh
git tag 1.2.3
```

Pushing to GitHub:

```sh
git push && git push --tags
```

### Actual npm publish

This is handled by Rush using the [`rush publish`](https://rushjs.io/pages/commands/rush_publish/) command.

```sh
rush publish -p --version-policy public --include-all
```

(Optional) Same command with npm registry and token specification

```sh
rush publish -p --version-policy public --include-all -r https://registry.npmjs.org/ -n ${NPM_AUTH_TOKEN}
```

## Repository mnemonics

### Force package version

Let's say the current version of `@daimler/ftk-core` and `@daimler/ftk-boilerplate` is `1.0.5` and (for whatever reason) it is required to change that to `0.9.3`:

```sh
rush version --override-version "0.9.3" --version-policy public --ensure-version-policy
rush version --override-version "0.9.3" --version-policy private --ensure-version-policy
```

> Be careful to execute the command for both version policies (`public` and `private`) to keep the packages in sync.

### Create package-lock.json

There are no `package-lock.json` files in the project folders.
This is because the dependencies are handled by Rush and Rush creates it's own lock file.
Sometimes a `package-lock.json` is needed within a certain project.
E.g. for security audits using `npm audit`.
The following command creates `package-lock.json` files for all projects on the fly:

```sh
rush package-lock
```
