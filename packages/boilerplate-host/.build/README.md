# FTK directory structure

> _helping you to organize and structure your project_

---

## Build information

Information for different build steps.

### Swidget exposed modules

In order to optimize the swidget size and improve loading speed different packages are marked as `exposed` and therefore required to be provided by the host application.

Add your `node_modules` to `exposed.modules.custom.js` if you want to expose certain modules for your host application.

The exposed name must match the expected name in the export section otherwise it will not work.

Initially a couple of packages are exposed like the `@daimler/ftk-core` itself and also for example `@material-ui/*`.
If you are sure that only the swidget will provide have the packages for example MaterialUI, please remove the corresponding section.

### Name of this directory:

> .build

### What is the purpose of this directory:

> Directory for build relevant configuration files.

### What files to put here:

> Config files for buildsteps. E.g. webpack.config.js

### What file types are allowed:

> JSON, JavaScript, TypeScript, YAML
