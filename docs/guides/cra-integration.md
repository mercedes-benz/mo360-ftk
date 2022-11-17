# WMF + CRA
- uses https://webpack.js.org/concepts/module-federation/ and https://create-react-app.dev/ to scaffold a mo360-hotloading-demo
- WARNING: until this PR is not merged you have to manually patch the node_modules app-definition in `node_modules/@daimler/ftk-core/lib/core/App.d.ts` by adding `children?: React.ReactNode | undefined` to `IAppProps`
- FRAGE: i18n raus?
# setup host
## install
- scaffold project
  `npx create-react-app host --template typescript`
  `cd host`
- install mo360; "force" since react-versions are not compatible yet
  `npm i @daimler/ftk-core --save --force`
- install rewired (https://github.com/timarney/react-app-rewired)
  `npm install react-app-rewired --save-dev`

## patch `package.json`
- replace cra-scripts by rewired
```
"start": "GENERATE_SOURCEMAP=false PORT=2999 react-app-rewired start",
"build": "react-app-rewired build",
"test": "react-app-rewired",
```

## create `src/bootstrap.tsx`
- module federation recommends using an asynchronous boundary, so we create a `bootstrap.tsx` following the official docs (https://webpack.js.org/concepts/module-federation/)
- `bootstrap.tsx` includes former `index.tsx` code and exports it a as function
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export default () => {
    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals();
}
```

## modify `src/index.tsx`
- lazy-imports `bootstrap.tsx`
```
import('./bootstrap').then(bundle => {
    bundle.default()
});

export {}
```
## modify `src/App.tsx`
```
import * as React from 'react';
import './App.css';
import {
    App,
    IDiContainer,
    RouteConfig,
    serviceIds,
    RouterProvider,
    TranslationProvider
} from '@daimler/ftk-core';

function init(container: IDiContainer): void {
    container.bind<RouteConfig>(serviceIds.routes).toConstantValue([
        {
            action: () => () => {
                return <>
                    <h1>hello world!</h1>
                </>
            },
            name: 'home',
            path: '/',
        },
    ]);
}

export default () => {
    return (
        <>
            <App name="cra-switch-host" init={init} config={{
                core: {
                    i18n: {
                        defaultLocale: 'en',
                    },
                },
                project: {
                    appName: '<My-App>',
                },
                runtime: {},
            }}>
                <TranslationProvider translations={{de: {}, en: {}}}>
                    <RouterProvider/>
                </TranslationProvider>
            </App>
        </>
    );
};
```

## create rewired's `config-overrides.js`
- patch cra's webpack-config and enable module federation
```
const path = require('path'),
    packageJson = require(path.resolve(process.cwd(), 'package.json')),
    ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = function override(config, env) {
    return {
        ...config,
        output: {
            ...config.output,
            publicPath: 'auto'
        },
        plugins: config.plugins.concat([
            new ModuleFederationPlugin({
                name: 'host',
                remotes: {
                },
                shared: packageJson.dependencies,
            }),
        ])
    };
}
```

## run
`npm start`

# setup swidget
## repeat above steps and adjust name to "swidget" and port to 3000
## `config-overrides.js`
```
const path = require('path'),
    packageJson = require(path.resolve(process.cwd(), 'package.json')),
    ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = function override(config, env) {
    return {
        ...config,
        output: {
            ...config.output,
            publicPath: 'auto'
        },
        plugins: config.plugins.concat([
            new ModuleFederationPlugin({
                name: 'swidget',
                filename: 'swidgetEntry.js',
                exposes: {
                    app: './src/App',
                },
                shared: packageJson.dependencies,
            }),
        ])
    };
}
```
## modify swidget's `src/App.tsx`
```
import * as React from 'react';
import './App.css';
import {
    App,
    IDiContainer,
    RouteConfig,
    serviceIds,
    RouterProvider,
    TranslationProvider
} from '@daimler/ftk-core';

function init(container: IDiContainer): void {
    container.bind<RouteConfig>(serviceIds.routes).toConstantValue([
        {
            action: () => () => {
                return <h1>hello world from swidget!</h1>
            },
            name: 'home',
            path: '/',
        },
    ]);
}

export default () => {
    return (
        <>
            <App name="cra-switch-swidget" init={init} config={{
                core: {
                    i18n: {
                        defaultLocale: 'en',
                    },
                },
                project: {
                    appName: '<My-App>',
                },
                runtime: {},
            }}>
                <TranslationProvider translations={{de: {}, en: {}}}>
                    <RouterProvider/>
                </TranslationProvider>
            </App>
        </>
    );
};
```
## run
`npm start`
# integrate swidget
## modify hosts `src/App.tsx`
- adds swidget-loader
```
import * as React from 'react';
import './App.css';
import {
    App,
    IDiContainer,
    RouteConfig,
    serviceIds,
    RouterProvider,
    TranslationProvider,
    SwidgetLoader
} from '@daimler/ftk-core';

function init(container: IDiContainer): void {
    container.bind<RouteConfig>(serviceIds.routes).toConstantValue([
        {
            action: () => () => {
                return <>
                    <h1>hello world!</h1>
                    <SwidgetLoader url="http://127.0.0.1:3000/swidgetEntry.js" scope="swidget" module="app" uniqueId="test123" />
                </>
            },
            name: 'home',
            path: '/',
        },
    ]);
}

export default () => {
    return (
        <>
            <App name="cra-switch-host" init={init} config={{
                core: {
                    i18n: {
                        defaultLocale: 'en',
                    },
                },
                project: {
                    appName: '<My-App>',
                },
                runtime: {},
            }}>
                <TranslationProvider translations={{de: {}, en: {}}}>
                    <RouterProvider/>
                </TranslationProvider>
            </App>
        </>
    );
};
```
