export default {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        targets: {
          node: '18',
          browsers: ['last 2 versions', 'not dead'],
        },
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [['@babel/plugin-transform-runtime', { version: '^7.19.6' }]],
};
