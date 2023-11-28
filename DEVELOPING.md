# Developing

> This guide is for the developing process of the FTK itself.  
> If you are developing an WebApp using the FTK then please head to the [Docs](docs/README.md).

---

## Getting started

### Prerequisites

* Node

### Installation

1. Clone repo
2. Execute `yarn` 

## What and Where

The folders and their content briefly explained:

* [docs](docs/): Documentation for the FTK usage
* [packages/core](packages/core/): This is heart of the FTK. These files are packed as the npm module called `@mercedes-benz/ftk-core`
* packages/example*: Contain the example code for host and swidget usages

**Happy coding!**

## Package publishing on npm

In addition to the npm publish we want to make sure that we have a corresponding GitHub release tag, an intact repository and a meaningful `CHANGELOG.md`.
That's why there are a few steps to go through.

### Preparation

Once the coding / bug fixing / improving / etc. is done and all changes have been committed, the integrity of the repository has to be verified.
Increment the version of the core by hand.

```sh
yarn # just as safety measures to have clean packages
yarn build:core # or from the core folder: yarn build

cd packages/core
yarn publish --access public # from the core package
```

If all those commands execute without any errors the repository is fine and a new version of the packages can be published.


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

NPMjs publish will be done via github actions workflow.
If the internal release fails you can execute the same command just make sure to have your local configuration pointing to the internal registry.
`yarn publish --access public`
