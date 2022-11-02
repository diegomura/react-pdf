import babel from '@rollup/plugin-babel';
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
  external: Object.keys(pkg.dependencies).concat(
    /@babel\/runtime/,
    /@react-pdf/,
  ),
  plugins: [
    babel({
      babelrc: true,
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
    }),
  ],
};

const config = Object.assign({}, configBase, {
  output: [
    getESM({ file: 'lib/index.mjs' }),
    getCJS({ file: 'lib/index.cjs.js' }),
  ],
});

export default config;
