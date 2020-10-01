// Documentation for this file: https://prettier.io/docs/en/configuration.html
module.exports = {
  // We use a larger print width because Prettier's word-wrapping seems to be tuned
  // for plain JavaScript without type annotations
  printWidth: 120,

  // Use .gitattributes to manage newlines
  endOfLine: 'auto',

  // Use single quotes instead of double quotes
  singleQuote: true,

  // Use commas everywhere, to make git line changes more readable
  trailingComma: 'all',
};
