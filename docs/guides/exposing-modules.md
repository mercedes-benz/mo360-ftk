# How to expose modules

## What is exposing

Certain modules (or packages) are required by the Host-App and one or more Swidgets (e.g. `react-dom`).
In a normal setup this means that the Host-App and every Swidget has to bundle `react-dom` into its deployable JS file.
Which results in **115kB** of _unnecessary_ code within each Swidgets JS file.

Why unnecessary?  
Because every Swidget could use the `react-dom` package that the Host-App has already bundle into itself, if the Host-App would be able to _provide_ it.

And that is exactly what **exposing** does.

It is a mechanism to _provide_ packages (from a predefined list) that are bundled within the Host-App to every Swidget that the Host-App loads during runtime.

## Why

In order to optimize the swidget size and improve loading speed.

## How

Add your `node_modules` to `.build/exposed.modules.custom.js` if you want to expose certain modules for your Host-App.

The exposed name must match the expected name in the export section otherwise it will not work.

Initially a couple of packages are exposed like the `@daimler/ftk-core` itself and also for example `react`, `react-dom`, `@material-ui/*`.
If you are sure that only the swidget will provide have the packages for example MaterialUI, please remove the corresponding section.
