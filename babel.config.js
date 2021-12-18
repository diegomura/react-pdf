module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        targets: {
          node: '12',
          browsers: 'last 2 versions',
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { version: '^7.16.4' }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-optional-chaining',
  ],
};
