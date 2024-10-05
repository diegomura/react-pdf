import localResolve from 'rollup-plugin-local-resolve';
import babel from '@rollup/plugin-babel';

import pkg from './package.json' assert { type: 'json' };

const input = 'src/index.js';

const getExternal = () => [
  ...Object.keys(pkg.dependencies),
  /@babel\/runtime/,
  /@react-pdf/,
];

const getPlugins = () => [
  localResolve(),
  babel({
    babelrc: true,
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
  }),
];

const config = {
  input,
  output: { format: 'es', file: 'lib/index.js' },
  external: getExternal(),
  plugins: getPlugins(),
};

export default config;
