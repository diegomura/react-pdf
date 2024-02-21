export default {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        targets: {
          node: '14',
          browsers: 'last 2 versions',
        },
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { version: '^7.19.6' }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-optional-chaining',
  ],
};
