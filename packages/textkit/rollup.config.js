import babel from '@rollup/plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';

import pkg from './package.json' assert { type: 'json' };

const babelConfig = () => ({
  babelrc: true,
  exclude: 'node_modules/**',
  babelHelpers: 'runtime',
});

const input = './src/index.js';

const getExternal = () => [
  ...Object.keys(pkg.dependencies),
  /@babel\/runtime/,
  /hyphen/,
];

const getPlugins = () => [localResolve(), babel(babelConfig())];

const config = {
  input,
  output: { format: 'es', file: 'lib/textkit.js' },
  external: getExternal(),
  plugins: getPlugins(),
};

export default [config];
