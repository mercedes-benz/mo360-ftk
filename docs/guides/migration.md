# Migration Guide

 - Update core-Package to v0.4
 - Update webpack to ^5.74.0 and webpack-cli ^4.10.0,
 - Adjust interfaces
   IRouteConfig[] -> RouteConfig

- Adjust Imports
  Route  -> RouterProvider

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
