module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 10,
        },
      },
    ],
  ],
  plugins: [],
  env: {
    development: {
      sourceMaps: 'inline',
      compact: false,
    },
  },
  comments: false,
};
