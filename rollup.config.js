import json from 'rollup-plugin-json';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import ignore from 'rollup-plugin-ignore';
import replace from 'rollup-plugin-replace';
import sourceMaps from 'rollup-plugin-sourcemaps';
import bundleSize from 'rollup-plugin-bundle-size';
import nodeResolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

const moduleAliases = {
  fetch: 'cross-fetch',
  'yoga-layout': 'yoga-layout-prebuilt',
};

const cjs = {
  exports: 'named',
  format: 'cjs',
  sourcemap: true,
};

const esm = {
  format: 'es',
  sourcemap: true,
};

const getCJS = override => Object.assign({}, cjs, override);
const getESM = override => Object.assign({}, esm, override);

const babelConfig = ({ browser }) => ({
  babelrc: false,
  exclude: 'node_modules/**',
  runtimeHelpers: true,
  presets: [
    [
      'env',
      Object.assign(
        {},
        {
          loose: true,
          modules: false,
        },
        browser ? {} : { targets: { node: '8.11.3' } },
      ),
    ],
    'react',
  ],
  plugins: [
    'transform-runtime',
    'external-helpers',
    'transform-object-rest-spread',
    ['transform-class-properties', { loose: true }],
  ],
});

const commonPlugins = [
  json(),
  sourceMaps(),
  alias(moduleAliases),
  nodeResolve(),
  bundleSize(),
];

const configBase = {
  globals: { react: 'React' },
  external: [
    'fbjs/lib/emptyObject',
    'fbjs/lib/warning',
    '@react-pdf/pdfkit',
    'babel-runtime/core-js/promise',
    'babel-runtime/helpers/objectWithoutProperties',
    'babel-runtime/helpers/extends',
    'babel-runtime/core-js/object/keys',
    'babel-runtime/core-js/array/from',
    'babel-runtime/core-js/json/stringify',
    'babel-runtime/core-js/object/assign',
    'babel-runtime/helpers/asyncToGenerator',
    'babel-runtime/core-js/get-iterator',
    'babel-runtime/helpers/inherits',
    'babel-runtime/helpers/classCallCheck',
    'babel-runtime/helpers/possibleConstructorReturn',
    'babel-runtime/regenerator',
    'babel-runtime/helpers/createClass',
    'babel-runtime/helpers/typeof',
  ].concat(Object.keys(pkg.dependencies), Object.keys(pkg.peerDependencies)),
  plugins: commonPlugins,
  sourcemap: true,
};

const serverConfig = Object.assign({}, configBase, {
  input: './src/node.js',
  output: [
    getESM({ file: 'dist/react-pdf.es.js' }),
    getCJS({ file: 'dist/react-pdf.cjs.js' }),
  ],
  plugins: configBase.plugins.concat(
    babel(babelConfig({ browser: false })),
    replace({
      BROWSER: JSON.stringify(false),
    }),
  ),
  external: configBase.external.concat(['fs', 'path', 'url']),
});

const serverProdConfig = Object.assign({}, serverConfig, {
  output: [
    getESM({ file: 'dist/react-pdf.es.min.js' }),
    getCJS({ file: 'dist/react-pdf.cjs.min.js' }),
  ],
  plugins: serverConfig.plugins.concat(uglify()),
});

const browserConfig = Object.assign({}, configBase, {
  input: './src/dom.js',
  output: [
    getESM({ file: 'dist/react-pdf.browser.es.js' }),
    getCJS({ file: 'dist/react-pdf.browser.cjs.js' }),
  ],
  plugins: configBase.plugins.concat(
    babel(babelConfig({ browser: true })),
    replace({
      BROWSER: JSON.stringify(true),
    }),
    ignore(['fs', 'path', 'url']),
  ),
});

const browserProdConfig = Object.assign({}, browserConfig, {
  output: [
    getESM({ file: 'dist/react-pdf.browser.es.min.js' }),
    getCJS({ file: 'dist/react-pdf.browser.cjs.min.js' }),
  ],
  plugins: browserConfig.plugins.concat(uglify()),
});

export default [
  serverConfig,
  serverProdConfig,
  browserConfig,
  browserProdConfig,
];
