import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const cjs = {
  exports: 'named',
  format: 'cjs',
};

const esm = {
  format: 'es',
};

const getCJS = override => Object.assign({}, cjs, override);
const getESM = override => Object.assign({}, esm, override);

const configBase = {
  input: 'src/index.js',
  external: Object.keys(pkg.dependencies),
  plugins: [
    json(),
    babel({
      babelrc: true,
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
    }),
  ],
};

const config = Object.assign({}, configBase, {
  output: [
    getESM({ file: 'lib/index.es.js' }),
    getCJS({ file: 'lib/index.cjs.js' }),
  ],
});

const prodConfig = Object.assign({}, configBase, {
  output: [
    getESM({ file: 'lib/index.es.min.js' }),
    getCJS({ file: 'lib/index.cjs.min.js' }),
  ],
  plugins: configBase.plugins.concat(terser()),
});

export default [config, prodConfig];
