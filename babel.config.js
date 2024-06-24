export default {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        targets: {
          node: '18',
          browsers: '>0.25%, not dead',
        },
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { version: '^7.19.6' }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-optional-chaining',
  ],
};
