import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import ignore from 'rollup-plugin-ignore';
import { terser } from 'rollup-plugin-terser';
import sourceMaps from 'rollup-plugin-sourcemaps';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json';

const globals = { react: 'React' };

const cjs = {
  globals,
  format: 'cjs',
  exports: 'named',
  sourcemap: true,
};

const esm = {
  globals,
  format: 'es',
  sourcemap: true,
};

const getCJS = override => Object.assign({}, cjs, override);
const getESM = override => Object.assign({}, esm, override);

const nodeInput = './src/node/index.js';
const domInput = './src/dom/index.js';

const babelConfig = () => ({
  babelrc: true,
  exclude: 'node_modules/**',
  babelHelpers: 'runtime',
  presets: ['@babel/preset-react'],
});

const getExternal = ({ browser }) => [
  '@babel/runtime/helpers/extends',
  '@babel/runtime/helpers/objectWithoutPropertiesLoose',
  '@babel/runtime/helpers/asyncToGenerator',
  '@babel/runtime/regenerator',
  ...(browser ? [] : ['fs', 'path', 'url']),
  // For browsers, bundle the commonjs dependency blob-stream with react-pdf
  ...Object.keys(pkg.dependencies).filter(
    dep => !browser || dep !== 'blob-stream',
  ),
  ...Object.keys(pkg.peerDependencies),
];

const getPlugins = ({ browser, minify = false }) => [
  json(),
  sourceMaps(),
  ...(browser ? [ignore(['fs', 'path', 'url'])] : []),
  babel(babelConfig()),
  commonjs(),
  nodeResolve({ browser, preferBuiltins: !browser }),
  replace({
    preventAssignment: true,
    values: {
      BROWSER: JSON.stringify(browser),
    },
  }),
  ...(minify ? [terser()] : []),
];

const serverConfig = {
  input: nodeInput,
  output: [
    getESM({ file: 'lib/react-pdf.es.js' }),
    getCJS({ file: 'lib/react-pdf.cjs.js' }),
  ],
  external: getExternal({ browser: false }),
  plugins: getPlugins({ browser: false }),
};

const serverProdConfig = {
  input: nodeInput,
  output: [
    getESM({ file: 'lib/react-pdf.es.min.js' }),
    getCJS({ file: 'lib/react-pdf.cjs.min.js' }),
  ],
  external: getExternal({ browser: false }),
  plugins: getPlugins({ browser: false, minify: true }),
};

const browserConfig = {
  input: domInput,
  output: [
    getESM({ file: 'lib/react-pdf.browser.es.js' }),
    getCJS({ file: 'lib/react-pdf.browser.cjs.js' }),
  ],
  external: getExternal({ browser: true }),
  plugins: getPlugins({ browser: true }),
};

const browserProdConfig = {
  input: domInput,
  output: [
    getESM({ file: 'lib/react-pdf.browser.es.min.js' }),
    getCJS({ file: 'lib/react-pdf.browser.cjs.min.js' }),
  ],
  external: getExternal({ browser: true }),
  plugins: getPlugins({ browser: true, minify: true }),
};

export default [
  serverConfig,
  serverProdConfig,
  browserConfig,
  browserProdConfig,
];
