import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import ignore from 'rollup-plugin-ignore';
import alias from '@rollup/plugin-alias';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const cjs = {
  exports: 'named',
  format: 'cjs'
};

const esm = {
  format: 'es'
};

const getCJS = override => Object.assign({}, cjs, override);
const getESM = override => Object.assign({}, esm, override);

const input = 'src/index.js';

const babelConfig = () => ({
  babelrc: true,
  exclude: 'node_modules/**',
  babelHelpers: 'runtime'
});

const getExternal = ({ browser }) => [
  ...Object.keys(pkg.dependencies).filter(
    dep =>
      !browser ||
      !['vite-compatible-readable-stream', 'browserify-zlib'].includes(dep)
  ),
  /\/node_modules\/pako\//,
  /crypto-js/,
  '@babel/runtime/helpers/inheritsLoose',
  '@babel/runtime/helpers/assertThisInitialized',
  '@babel/runtime/helpers/createForOfIteratorHelperLoose',
  '@babel/runtime/helpers/extends',
  ...(browser ? [] : ['fs'])
];

const getPlugins = ({ browser, minify = false }) => [
  json(),
  ...(browser
    ? [
        ignore(['fs']),
        alias({
          entries: [
            { find: 'stream', replacement: 'vite-compatible-readable-stream' },
            { find: 'zlib', replacement: 'browserify-zlib' }
          ]
        }),
        commonjs(),
        nodeResolve({ browser, preferBuiltins: !browser }),
        nodePolyfills({
          include: [/node_modules\/.+\.js/, /pdfkit\/src\/.*\.js/]
        })
      ]
    : [nodeResolve({ browser, preferBuiltins: !browser })]),
  replace({
    preventAssignment: true,
    values: {
      BROWSER: JSON.stringify(browser)
    }
  }),
  babel(babelConfig()),
  ...(minify ? [terser()] : [])
];

const serverConfig = {
  input,
  output: [
    getESM({ file: 'lib/pdfkit.es.js' }),
    getCJS({ file: 'lib/pdfkit.cjs.js' })
  ],
  external: getExternal({ browser: false }),
  plugins: getPlugins({ browser: false })
};

const serverProdConfig = {
  input,
  output: [
    getESM({ file: 'lib/pdfkit.es.min.js' }),
    getCJS({ file: 'lib/pdfkit.cjs.min.js' })
  ],
  external: getExternal({ browser: false }),
  plugins: getPlugins({ browser: false, minify: true })
};

const browserConfig = {
  input,
  output: [
    getESM({ file: 'lib/pdfkit.browser.es.js' }),
    getCJS({ file: 'lib/pdfkit.browser.cjs.js' })
  ],
  external: getExternal({ browser: true }),
  plugins: getPlugins({ browser: true })
};

const browserProdConfig = Object.assign({}, browserConfig, {
  input,
  output: [
    getESM({ file: 'lib/pdfkit.browser.es.min.js' }),
    getCJS({ file: 'lib/pdfkit.browser.cjs.min.js' })
  ],
  external: getExternal({ browser: true }),
  plugins: getPlugins({ browser: true, minify: true })
});

export default [
  serverConfig,
  serverProdConfig,
  browserConfig,
  browserProdConfig
];
