import babel from '@rollup/plugin-babel';

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

const input = 'src/index.js';

const getExternal = () => [/@babel\/runtime/];

const getPlugins = () => [
  babel({
    babelrc: true,
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
  }),
];

const config = {
  input,
  output: [getESM({ file: 'lib/index.js' }), getCJS({ file: 'lib/index.cjs' })],
  external: getExternal(),
  plugins: getPlugins(),
};

export default config;
