# Core features

- [Access within React components](#access-within-react-components)
- [Access through React hooks](#access-through-react-hooks)
- [Router](#router)
- [i18n](#i18n)
- [Config](#config)

## Access within React components

The FTK uses the React Context together with Inversify to make dependencies available through the component tree of a container.  

Within each React-component below App, you can access the core-features with an injection like this:
```ts
import { RouterService, inject, withInject } from '@mercedes-benz/ftk-core';

class ExampleClass extends React.Component<{}, {}> {
  @inject()
  public router!: RouterService;
  
  // ...
}

export default withInject(ExampleClass);
```
___
## Access through React hooks
Outside of classes, the core features can be accessed by React Hooks.

Example:
```ts
import { useRouter } from '@mercedes-benz/ftk-core';

export default function exampleFunction() {
  const router = useRouter();
}
```
___

## Router

The router service provides the logic for routing. The FTK provides an own router, to enable nested routing for SWIDGETS.

Access through injection:
```ts
import { RouterService } from '@mercedes-benz/ftk-core';
// ...

@inject()
public router!: RouterService;
```

Access through Hook:
```ts
import { useRouter } from '@mercedes-benz/ftk-core';
// ...

const router = useRouter();
```
See [API-Documentation RouterService](../api/RouterService.md)
See [Example RouterService](../api/RouterService.md)
___

## i18n

The i18n Service provides a basic translation functionality. It requires a Translation-Map provided by the TranslationProvider, which has to be nested within the App component like this (example ./src/App.tsx):

```ts
import { IDiContainer, IRouteConfig, ISwidget, Route, serviceIds, App, TranslationProvider } from '@mercedes-benz/ftk-core';
import * as React from 'react';
import TranslationsI18n from './globals/i18n/Translations.i18n';

  const swidget: ISwidget = (): JSX.Element => {
  return (
    <App name="my-app" init={init} config={config}>
        <TranslationProvider translations={TranslationsI18n}>
            <Route />
        </TranslationProvider>
    </App>
  );
};
```


Access through injection:
```ts
import { I18nService } from '@mercedes-benz/ftk-core';
// ...

@inject()
public i18n!: I18nService;
```

Access through Hook:
```ts
import { useI18n } from '@mercedes-benz/ftk-core';
// ...

const i18n = useI18n();
```

See [API-Documentation I18nService](../api/I18nService.md)
See [Example I18nService](../examples/I18nService.md)
___

## Config

The app-configuration (if required) is loaded as property of the App-Component and accessed by the configuration service. It can be loaded dependent on the environment based on the --env.config parameter in the build job.

Loading configuration based on the environment within ./src/App.tsx:

```ts
const config = require(`../config/${__CONFIG__}`).default;

const swidget: ISwidget = (): JSX.Element => {
  return (
    <App name="my-app" init={init} config={config}>
        <Route />
    </App>
  );
};

export default swidget;
```


Access through injection:
```ts
import { ConfigService } from '@mercedes-benz/ftk-core';
// ...

@inject()
public config!: ConfigService;
```

Access through Hook:
```ts
import { useConfig } from '@mercedes-benz/ftk-core';
// ...

const config = useConfig();
```
See [API-Documentation ConfigSerice](../api/ConfigService.md)
See [Example ConfigSerice](../exmples/ConfigService.md)
___

