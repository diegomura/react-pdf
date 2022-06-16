import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import ignore from 'rollup-plugin-ignore';
import { terser } from 'rollup-plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import pkg from './package.json';

const cjs = {
  exports: 'named',
  format: 'cjs',
};

const es = {
  format: 'es',
};

const getCJS = override => Object.assign({}, cjs, override);
const getESM = override => Object.assign({}, es, override);

const input = 'src/index.js';

const babelConfig = ({ browser }) => ({
  babelrc: false,
  exclude: 'node_modules/**',
  babelHelpers: 'runtime',
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        ...(browser
          ? { targets: { browsers: 'last 2 versions' } }
          : { targets: { node: '12' } }),
      },
    ],
  ],
  plugins: [['@babel/plugin-transform-runtime', { version: '^7.16.4' }]],
});

const getExternal = ({ browser }) => [
  ...(Object.keys(pkg.dependencies)
    // For browsers, bundle the commonjs dependencies dfa and restructure with react-pdf
    .filter(dep => !browser || !['dfa', 'restructure'].includes(dep))
  ),
  '@babel/runtime/helpers/createForOfIteratorHelperLoose',
  '@babel/runtime/helpers/createClass',
  '@babel/runtime/helpers/applyDecoratedDescriptor',
  '@babel/runtime/helpers/defineProperty',
  '@babel/runtime/helpers/inheritsLoose',
  ...(browser ? ['@babel/runtime/regenerator'] : ['fs', 'brotli'])
];

const getPlugins = ({ browser, minify = false }) => [
  ...(browser ? [ignore(['fs', 'brotli', './WOFF2Font'])] : []),
  replace({
    preventAssignment: true,
    values: {
      BROWSER: JSON.stringify(browser),
    },
  }),
  json(),
  nodeResolve({ browser, preferBuiltins: !browser }),
  commonjs({ include: [ /node_modules\// ] }),
  // babel must come after commonjs, otherwise the following error happens: 'default' is not exported by ../../node_modules/dfa/index.js
  babel(babelConfig({ browser })),
  // nodePolyfills must come after commonjs, otherwise commonjs treats all files with injected imports as es6 modules
  nodePolyfills({
    include: [ /node_modules\/.+\.js/ ]
  }),
  ...(minify ? [terser()] : []),
];

const serverConfig = {
  input,
  output: [
    getESM({ file: 'lib/fontkit.es.js' }),
    getCJS({ file: 'lib/fontkit.cjs.js' }),
  ],
  external: getExternal({ browser: false }),
  plugins: getPlugins({ browser: false }),
};

const serverProdConfig = {
  input,
  output: [
    getESM({ file: 'lib/fontkit.es.min.js' }),
    getCJS({ file: 'lib/fontkit.cjs.min.js' }),
  ],
  external: getExternal({ browser: false }),
  plugins: getPlugins({ browser: false, minify: true }),
};

const browserConfig = {
  input,
  output: [
    getESM({ file: 'lib/fontkit.browser.es.js' }),
    getCJS({ file: 'lib/fontkit.browser.cjs.js' }),
  ],
  external: getExternal({ browser: true }),
  plugins: getPlugins({ browser: true }),
};

const browserProdConfig = {
  input,
  output: [
    getESM({ file: 'lib/fontkit.browser.es.min.js' }),
    getCJS({ file: 'lib/fontkit.browser.cjs.min.js' }),
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
