# Swidgets

Swidgets are one fundamental part of the FTK.
Therefore it is good to know how you could use them the best way.

## Base structure

For a swidget loading we have two components: The `host app` and the `swidget app`.
The `host app` is the running standalone application which is directly accessible.
The `swidget` is not directly runnable because of the compilation it is only a plain JavaScript file which contains all dependencies.
The `swidget` must be loaded by a `host app` which renders it correctly for the user.

For this purpose the boilerplate has two build scripts:

- `npm run build:host`: for building the host application
- `npm run build:swidget`: for building the swidget

The resulting JavaScript `swidget` is a plain JS file.
It will contain something like this:

```js
// The name is the mandatory thing. It is needed for loading the swidget.
// It is constructed from the package name in your package.json file
var nameOfYourSwidget = { lotOfStuffYouDontNeedDoUnderstand };
```

## How to load a swidget?

The FTK provides an easy component for loading a swidget:

```ts
// Assume the swidget is accessible on a webserver: http://test.de/someSwidget.js
public render() {
  // The name must match the variable name in the JS file. Otherwise it will not load the swidget.
  return <Loader name={nameOfSwidgetApplication} url={'http://test.de/someSwidget.js'} />>;
}
```

## What can I do with the swidget?

- You can provide `props` to the swidget like a normal react component
- You can construct a communication between host/swidget or swidget/swidget via `Interconnection`

### How to use interconnection?

To use the Interconnection you have to either inject the `InterconnectionService` or use the hook `useInterconnection()`.

**BUT!**: keep in mind to keep the communication topics separated as needed.
If not swidget/host could intercept the communication they should not be aware of.
As an easy advise you could use generated UUID from the host and provided to the swidgets via props.

## What I should care about?

- Try to keep the swidgets size as small as possible:
  Mark dependencies which do not often change as external and ensure that the host app provides them.
  This will reduce the swidget size drastically.
  See the [Exposing guide](../../guides/exposing-modules.md).
