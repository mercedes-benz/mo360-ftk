# Migration Guide

## Adjust code to new router-interfaces

 - Update core-Package to v0.4
 - Adjust interfaces
   IRouteConfig[] -> RouteConfig
 - Adjust Imports
   Route  -> RouterProvider
 - replace linkToHome() with linkTo('home')

  - Update route-declarations in router-config:

 Old:
 ```ts
  container.bind<IRouteConfig[]>(serviceIds.routes).toConstantValue([
    {
      component: () => <h1>Hello World</h1>,
      name: 'home',
      pattern: '/',
    },
  ]);
 ```

 New
 ```ts
   container.bind<RouteConfigType>(serviceIds.routes).toConstantValue([
    {
      name: 'home',
      path: '',
      action: () => {
        return () => <h1>Hello World</h1>
      },
    }
  ]);
  ```

  ## Hints
  Route-Parameter come now as string | string[], so you might need to specify, which one you use:
  ``` 
    router.getRoute().parameter.client  as string 
  ```
  As alternative, you could declare a type for the known params:
  ```
  type KnownParams = {
    client: string;
  }

  const test: RouteType = {} as any;

  (test.parameter as KnownParams).client
  ```
  Route Parameters also need to be set as string now:
  ```
  navigateTo(this.router, 'overviewPage', true, { client }, { day: selectedDate.getTime().toString() });
  ```

## If using swidgets: Update to Webpack 5 and Webpack Module Federation

NOTICE: If you don't use swidgets in your project, this steps are optional

- Update webpack to ^5.74.0 and webpack-cli ^4.10.0
- Fix webpack-configuration after update -> Webpack5 introduces some breaking changes to your webpack configuration. As we can't know, which plugins you use and how you set it up, we can't provide a detailed guide for the required changes. 
- Remove expose loader config from your webpack configuration.
  - for host, remove this lines in your .build/webpack/base.js
  ```
  const { defaultExposedModules, addExposedModules } = require('./exposed.modules');
  const customExposedModules = require('../exposed.modules.custom');
  addExposedModules(base.module.rules, { ...defaultExposedModules, ...customExposedModules });
  ````
  - for swidget, remove this lines in your .build/webpack/swidget.js
  ```
  externals: {
    ...defaultExposedModules,
    ...customExposedModules,
  },
  ```
- to set up package bundling with CRA, follow [this guide](cra-integration.md) from the step "Create src/bootstrap.tsx"

