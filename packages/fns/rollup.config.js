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

const input = 'src/index.js';

const getExternal = ({ browser }) => [
  ...(Object.keys(pkg?.dependencies || {})),
  /@babel\/runtime/,
  /@react-pdf/,
];

const getPlugins = ({ browser }) => [
  babel({
    babelrc: true,
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
  }),
];

const config = {
  input,
  output: [
    getESM({ file: 'lib/index.es.js' }),
    getCJS({ file: 'lib/index.cjs.js' }),
  ],
  external: getExternal({}),
  plugins: getPlugins({}),
};

export default config;