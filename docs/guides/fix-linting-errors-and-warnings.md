# How to fix linting errors and warnings

The boilerplate comes with a preconfigured set of linters.  

```sh
npm run lint:fix
```

The above command is a chained command of ESLint and Stylelint.  
Refer to the corresponding section:

- [ESLint](#eslint) for `*.js`, `*.ts` and `*.tsx` files
- [Stylelint](#stylelint) for `*.css` and `*.scss` files

----

## ESLint

Website: [https://eslint.org/](https://eslint.org/)  
Documentation: [ESLint configuration user-guide](https://eslint.org/docs/user-guide/configuring)  
Configuration file: `.eslintrc.js`  

- [**Fix** error or warning](#fix-eslint-error-or-warning)
- [**Ignore** error or warning](#ignore-eslint-error-or-warning)
- [**Change severity** of linting rule](#change-eslint-rule-severity)

### Fix ESLint error or warning

There are a couple of resources for the different linting rules that the boilerplate has integrated:

- [eslint/*](https://eslint.org/docs/rules/)
- [@typescript-eslint/*](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules)
- [react/*](https://github.com/yannickcr/eslint-plugin-react#list-of-supported-rules)
- prettier/*: Will be fixed automatically by Prettier if you run `npm run lint:fix`

If you don't find a solution to your error/warning in one of the above resources, [Google](https://www.google.com/) and [StackOverflow](https://stackoverflow.com/) are your friends.

### Ignore ESLint error or warning

You can add a comment in your sourcecode to indicate that you want the linter to ignore linting errors or warnings in the following line of code.

Lets say you have an error message like this:  
  
```sh
120:5   error    'countItems' is never reassigned. Use 'const' instead       prefer-const
```

By changing the code to the following, the error will be ignored:

```js
120:     // eslint-disable-next-line
121:     let countItems: number = 7;
```

### Change ESLint rule severity

You can reduce the severity of a particular linting rule from `error` to `warning` or even turn `off` the rule.

Lets say you find plenty of the following error messages:

```sh
549:67  error    'value' is missing in props validation                     react/prop-types
549:74  error    'onChange' is missing in props validation                  react/prop-types
568:9   error    'key' is missing in props validation                       react/prop-types
```

Notice that the last text chunk on each line of the linter output identifies the name of the corresponding linting rule.
In this case `react/prop-types`.  
To reduce the severity of this particular rule open the ESLint configuration file `.eslintrc.js` and within the `rules` section add the following:

```json
'react/prop-types': 'warn',
```

Running the `npm run lint:fix` command again will give you

```sh
549:67  warning  'value' is missing in props validation                     react/prop-types
549:74  warning  'onChange' is missing in props validation                  react/prop-types
568:9   warning  'key' is missing in props validation                       react/prop-types
```

You can also disable a linting rule completely by setting it to `'off'`.

----

## Stylelint

Website: [https://stylelint.io/](https://stylelint.io/)  
Documentation: [Stylelint configuration user-guide](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md)  
Configuration file: `.stylelintrc`  

- [**Fix** error or warning](#fix-stylelint-error-or-warning)
- [**Ignore** error or warning](#ignore-stylelint-error-or-warning)
- [**Change severity** of linting rule](#change-stylelint-rule-severity)

### Fix Stylelint error or warning

Please refer to the stylelint rules to see how to fix them:

- [Stylelint rules](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/rules.md)

If you don't find a solution to your error/warning in one of the above resources, [Google](https://www.google.com/) and [StackOverflow](https://stackoverflow.com/) are your friends.

### Ignore Stylelint error or warning

You can wrap your sourcecode with comments to indicate you want the linter to ignore linting errors or warnings within the wraps lines of code.

Lets say you have an error message like this:  
  
```sh
 20:1  ✖  Expected selector ".item" to come before selector ".item:first-of-type"       no-descending-specificity
```

By changing the code to the following, the error will be ignored:

```css
20:     /* stylelint-disable */
21:     .item:first-of-type { ... }
22:     .item { ... }
23:     /* stylelint-enable */
```

### Change Stylelint rule severity

You can reduce the severity of a particular linting rule from `error` to `warning` or even turn `off` the rule.

Do so by modifying the corresponding rule inside `.stylelintrc`.

Please refer to the [rules severity section](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md#severities-error--warning) on the official stylelint docs on how change it according to your desire.
