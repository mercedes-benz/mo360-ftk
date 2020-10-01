# API: \<SwidgetLoader>

```tsx
<SwidgetLoader />
```

Central component to load Swidgets from external sources.

> Every app that consumes Swidgets, should be built as "host" with ```npm run build:host```

## Properties:

```tsx
interface ISwidgetLoaderProps {
    name: string;
    errorFallback?: (error: Error) => React.ReactNode;
    loadingPlaceholder?: React.ReactNode;
    url: string;
    props?: object;
    uniqueId?: string;
}
```
___
### name

```tsx
name:string
```

Name of the Swidget. Must match the name of the application that is loaded with the JS.
___
### errorFallback

```tsx
errorFallback?: (error: Error) => React.ReactNode
```

Fallback Component, that is rendered, if the Swidget can't be loaded. Error message passed als parameter.
___
### loadingPlaceholder

```tsx
loadingPlaceholder?: React.ReactNode
```

Loader component, can override the default loader.
___
### url

```tsx
url: string
```

URL of the Swidget-JS.
___
### props

```tsx
props?: object
```

Properties, that are passed into the Swidget.
___
### uniqueId

```tsx
uniqueId?: string
```

Unique ID of the Swidget. Should be set, if more Swidgets with same name are loaded.
This property is used to map the swidget-routes into the routing-hash and should not be random (reload should always result in same ID for a swidget in a certain position).
