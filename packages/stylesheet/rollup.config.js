import localResolve from 'rollup-plugin-local-resolve'
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

const input = 'src/index.js';

const getExternal = () => [
  ...(Object.keys(pkg.dependencies)),
  /@react-pdf/,
];

const getPlugins = () => [
  localResolve(),
];

const config = {
  input,
  output: [
    getESM({ file: 'lib/index.es.js' }),
    getCJS({ file: 'lib/index.cjs.js' }),
  ],
  external: getExternal(),
  plugins: getPlugins(),
};

export default config;
