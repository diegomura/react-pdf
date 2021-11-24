import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import ignore from 'rollup-plugin-ignore';
import sourceMaps from 'rollup-plugin-sourcemaps';

import pkg from './package.json';

const external = [
  '@babel/runtime/helpers/asyncToGenerator',
  '@babel/runtime/regenerator',
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

const serverConfig = {
  input: './src/index.js',
  output: {
    format: 'cjs',
    file: 'lib/index.js',
    exports: 'named',
    sourcemap: true,
  },
  external: external.concat(['fs', 'path', 'url']),
  plugins: [
    sourceMaps(),
    babel(babelConfig({ browser: false })),
    replace({ BROWSER: JSON.stringify(false) }),
  ],
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
  plugins: [
    sourceMaps(),
    babel(babelConfig({ browser: true })),
    replace({ BROWSER: JSON.stringify(true) }),
    ,
    ignore(['fs', 'path', 'url']),
  ],
};

export default [serverConfig, browserConfig];
