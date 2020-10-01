# API: RouterService

See also: [Examples RouterService](../examples/RouterService.md)

- [Access through injection:](#access-through-injection)
- [Access through hook](#access-through-hook)
- [getRoute()](#getroute)
- [linkTo()](#linkto)
- [linkToHome()](#linktohome)
- [navigate()](#navigate)
- [navigateToHome()](#navigatetohome)
- [Not implemented yet: navigateTo()](#not-implemented-yet-navigateto)
- [Navigation within Swidgets](#navigation-within-swidgets)

___

## Access through injection:

```tsx
import { inject, withInject, RouterService } from '@daimler/ftk-core';
// ...
class Example extends React.Component<{}, {}> {
  @inject()
  public router!: RouterService;
  // ...
}

export default withInject(Example);
```

___

## Access through hook

```tsx
import { useRouter } from '@daimler/ftk-core';
// ...
const router = useRouter();
// ...
```

___

___

## getRoute()

```tsx
getRoute(): {
    name: string;
    url: string;
    parameter: any;
    query: any;
}: IRoute;
```

The **_getRoute_** Method provides the current route and an easy way to access the route- and query-params.
___

## linkTo()

```tsx
linkTo(
    name: string,
    parameter?: object,
    query?: object
): string;
```

The **_linkTo_** Method provides the URL of a route, specified by its parameters.
___

## linkToHome()

```tsx
linkToHome(): string;
```

The **_linkToHome_** Method provides the URL of the Home-route.
___

## navigate()

```tsx
navigate(url: string): void;
```

The **_navigate_** Method navigates to a given URL.
___

## navigateToHome()

```tsx
navigateToHome(): void;
```

The **_navigateToHome_** Method navigates to the Home-route.
___

## Not implemented yet: navigateTo()

```tsx
navigateTo(
  name: string,
  parameter?: object,
  query?: object
): void;
```

TODO: :wrench: Implement a method, that navigates directly to a route, specified by its parameters.
___
___

## Navigation within Swidgets

When using Swidgets, the router takes care of nested routing. So a route-change within the Swidget will also change the route of the host-application. This also works with multiple Swidgets, that are loaded at the same time, as long as:

- you provide a **_unique_** ID for each Swidget
- the unique ID is **_not_** random (and stays the same when reloading the host-application)
