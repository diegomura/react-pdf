import babel from '@rollup/plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';
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
  input: './src/index.js',
  external: Object.keys(pkg.dependencies),
  plugins: [
    localResolve(),
    babel({
      babelrc: true,
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
    }),
  ],
};

const config = Object.assign({}, configBase, {
  output: [
    getESM({ file: 'lib/textkit.es.js' }),
    getCJS({ file: 'lib/textkit.cjs.js' }),
  ],
});

export default config;
