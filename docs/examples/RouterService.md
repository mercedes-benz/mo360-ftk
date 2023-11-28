# Example: Using the router

See also: [API documentation RouterService](../api/RouterService.md)

- [Define routes](#define-routes)
- [Display route](#display-route)
- [Get route-link](#get-route-link)
- [Navigate to route](#navigate-to-route)
- [Route-parameters](#route-parameters)
  - [Set Route-parameters](#set-route-parameters)
  - [Read Route-parameters](#read-route-parameters)
- [Query-parameters](#query-parameters)
  - [Set Query-parameters](#set-query-parameters)
  - [Read Query-parameters](#read-query-parameters)

The Router is optimized to support routing for host-applications with embedded SWIDGETS.

If you don't use SWIDGETS and don't plan to use it ever within your project, you can also use any other React-based Router.
___

## Define routes

> Every route-definition implements the IRouteConfig-Interface:

```tsx
interface IRouteConfig {
    name: string;
    pattern: string;
    component: React.ComponentType<any>;
}
```

Name and pattern of each route should be unique.

The third parameter defines the root-component of the route.

Within the Bionic Boilerplate, the route-definition is done within ./src/routes/index.tsx:

```tsx
import * as React from 'react';
import DemoContent from './DemoContent';
import Home from './Home';
import { IRouteConfig } from '@mercedes-benz/ftk-core';

const routes: IRouteConfig[] = [
  {
    component: Home,
    name: 'home',
    pattern: '/',
  },
  {
    component: DemoContent,
    name: 'demoContent',
    pattern: '/demoContent',
  },
];

export default routes;
```

___

## Display route

To display the route content within your application, simply load the Route-Compontent within the DOM-tree of the App:

```tsx
//...

import { Route } from '@mercedes-benz/ftk-core';
import routes from './routes';

//...

const swidget: ISwidget = (): JSX.Element => {
  return (
    <App name="my-app" init={init} config={config}>
        <Route />
    </App>
  );
};

//...
```

> In the Bionic boilerplate this is done within ./src/App.tsx
___

## Get route-link

To get a link based on the route-name, use the linkTo-Method from the RouterService:

```tsx
import * as React from 'react';
import { inject, withInject, RouterService } from '@mercedes-benz/ftk-core';

class Home extends React.Component<{}, {}> {
    @inject()
    public router!: RouterService;

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <a href={this.router.linkTo('demoContent')}>Link to demo-content</a>
            </React.Fragment>
        );
    }
}

export default withInject(Home);
```

> To link to the home-route, you can use the linkToHome method.
___

## Navigate to route

To navigate to a url, use the navigate-Method from the RouterService.

```tsx
this.router.navigate(this.router.linkTo('demoContent'));
```

> Notice: a navigateTo(routeName: string) method will be implemented soon.
>
> To navigate to the home-route, you can use the navigateToHome method.
___

## Route-parameters

Route-parameters can be set and accessed dynamically.  
See the following route configuration:

```tsx
const routes: IRouteConfig[] = [
  {
    component: Details,
    name: 'details',
    pattern: '/details/:group/:part',
  },
];
```

### Set Route-parameters

```tsx
this.router.linkTo(
    'details',
    { group: 'foo', part: 'bar' }
);
```

> This will result to: /#!/details/foo/bar

### Read Route-parameters

The route-parameters are attached to the parameter-member of every route:

```tsx
import * as React from 'react';
import { inject, withInject, RouterService } from '@mercedes-benz/ftk-core';

class Details extends React.Component<{}, {}> {
    @inject()
    public router!: RouterService;

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <p>Group: {this.router.getRoute().parameter.group}</p>
                <p>Part: {this.router.getRoute().parameter.part}</p>
            </React.Fragment>
        );
    }
}

export default withInject(Details);
```

> As route-parameters are always dynamically, make sure, that you check if the value of each parameter is set (correctly), before you use it.

___

## Query-parameters

Query-parameters can be set and accessed dynamically.

### Set Query-parameters

```tsx
this.router.linkTo(
    'demoContent',
    {},
    { queryParamOne: 'value1', queryParamTwo: 'value2' }
);
```

> This will result to: /#!/demoContent?queryParamOne=value1&queryParamTwo=value2

### Read Query-parameters

The query-parameters are attached to the query-member of every route:

```tsx
import * as React from 'react';
import { inject, withInject, RouterService } from '@mercedes-benz/ftk-core';

class DemoContent extends React.Component<{}, {}> {
    @inject()
    public router!: RouterService;

    public render(): JSX.Element {
        return (
            <React.Fragment>
                Set queryParamOne: {this.router.getRoute().query.queryParamOne}
            </React.Fragment>
        );
    }
}

export default withInject(DemoContent);
```

> As queries are always dynamically, make sure, that you check if the value of each parameter is set (correctly), before you use it.
