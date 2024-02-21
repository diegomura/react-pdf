import babel from '@rollup/plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';

import pkg from './package.json' assert { type: 'json' };

const cjs = {
  exports: 'named',
  format: 'cjs',
  interop: 'compat',
};

const esm = {
  format: 'es',
};

const getCJS = (override) => Object.assign({}, cjs, override);
const getESM = (override) => Object.assign({}, esm, override);

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
  output: [
    getESM({ file: 'lib/textkit.js' }),
    getCJS({ file: 'lib/textkit.cjs' }),
  ],
  external: getExternal(),
  plugins: getPlugins(),
};

export default [config];
