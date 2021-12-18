import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import sourceMaps from 'rollup-plugin-sourcemaps';

import pkg from './package.json';

const external = [
  '@babel/runtime/regenerator',
  '@babel/runtime/helpers/extends',
  '@babel/runtime/helpers/asyncToGenerator',
  '@babel/runtime/helpers/objectWithoutPropertiesLoose',
  ...Object.keys(pkg.dependencies),
];

const babelConfig = ({ browser }) => ({
  babelrc: false,
  exclude: 'node_modules/**',
  babelHelpers: 'runtime',
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        ...(browser
          ? { targets: { browsers: 'last 2 versions' } }
          : { targets: { node: '12' } }),
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { version: '^7.16.4' }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
});

const getPlugins = ({ browser }) => [
  sourceMaps(),
  babel(babelConfig({ browser })),
  replace({
    preventAssignment: true,
    values: {
      BROWSER: JSON.stringify(browser),
    },
  }),
];

const serverConfig = {
  input: './src/index.js',
  output: {
    format: 'cjs',
    file: 'lib/index.js',
    exports: 'named',
    sourcemap: true,
  },
  external,
  plugins: getPlugins({ browser: false }),
};

const browserConfig = {
  input: './src/index.js',
  output: {
    format: 'cjs',
    file: 'lib/index.browser.js',
    exports: 'named',
    sourcemap: true,
  },
  external,
  plugins: getPlugins({ browser: true }),
};

export default [serverConfig, browserConfig];
