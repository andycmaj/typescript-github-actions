module.exports = {
  presets: [
    '@babel/typescript',
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
        },
        debug: false,
      },
    ],
  ],
  plugins: [],
};
