# API: \<App>

 ```tsx
 <App />
 ```

Main entry point to a WebApp. Binds a new dependency injection container to all children, and sets up some default dependencies.
 
> This is a replacement for the previous "kernel" function.

## Properties:

```tsx
interface IAppProps {
    name: string;
    init?: (container: IDiContainer) => void | IDiContainer;
    config?: IConfigData;
}
```
___
### name

```tsx
name: string
```

A name for the app. This is i.e. used in interconnection where we communicate between different nested Apps ("swidgets") and can use the name to determine the sending/receiving swidget.
___
### init

```tsx
init?: (container: IDiContainer) => void | IDiContainer
```

We allow an init function to be passed. The passed container already contains the default dependencies in its parent container, so those can be overridden.
___
### config

```tsx
config?: IConfigData
```

Configuration to be passed. If non is given, the default configuration will be used.

If given, the default configuration will be merged with the given configuration object using lodash's recursive merge(). 

If the App is loaded as a swidget, the configuration from the parent host will be merged with the given config object.

