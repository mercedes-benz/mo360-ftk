# API: I18nService

Examples coming soon.

- [Access through injection:](#access-through-injection)
- [Access through hook](#access-through-hook)
- [translate()](#translate)
- [translateToString()](#translatetostring)
- [setLang()](#setlang)
- [getLang()](#getlang)
- [getLangs()](#getlangs)
___

## Access through injection:

```tsx
import { inject, withInject, I18nService } from '@daimler/ftk-core';
// ...
class Example extends React.Component<WithStyles<{}>, {}> {
  @inject()
  public i18n!: I18nService;
  // ...
}

export default withInject(Example);
```
___

## Access through hook
```tsx
import { useI18n } from '@daimler/ftk-core';
// ...
const i18n = useI18n();
// ...
```
___
___


## translate()

```tsx
translate(translationId: string, params?: any): any;
```
The **_translate_** Method provides the value of the tranlation map for the set translationId (key) and current language as react component.
If the value contains placeholders, these are replaced by the content of the params parameter.
___

## translateToString()

```tsx
translateToString(translationId: string, params?: any): string;
```
The **_translateToString_** Method does the same as **_translate_** but provides the translation as simple string value.
___

## setLang()

```tsx
setLang(lang: string): void;
```
The **_setLang_** Method sets the current language to the lang parameter value.
___

## getLang()

```tsx
getLang(): string;
```
The **_getLang_** Method provides the language key of the current set language.
___

## getLangs()

```tsx
getLangs(): string[];
```
The **_getLangs_** Method provides all available language keys.
___
___

## I18n within Swidgets

Each Swidget should provide it's own language files 
