import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import sourceMaps from 'rollup-plugin-sourcemaps';
import bundleSize from 'rollup-plugin-bundle-size';
import ignore from 'rollup-plugin-ignore';
import pkg from './package.json';

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
  presets: [
    [
      'env',
      {
        loose: true,
        modules: false,
        targets: browser
          ? {
              browsers: [
                '> 0.05%',
                'not dead',
                'not ie 11',
                'not android 4.1',
                'not android 4.2',
                'not android 4.4',
                'not android 4.4.3',
                'not chrome 29',
                'not chrome 43',
                'not chrome 49',
                'not chrome 54',
                'not firefox 47',
                'not firefox 48',
                'not firefox 51',
                'not firefox 52',
                'not ios 8.1',
                'not ios 9.3',
                'not safari 5.1',
                'not safari 9.1',
              ],
            }
          : { node: '8.11.3' },
      },
    ],
    'react',
  ],
  plugins: [
    'external-helpers',
    'transform-object-rest-spread',
    ['transform-class-properties', { loose: true }],
  ],
});

const commonPlugins = [sourceMaps(), nodeResolve(), bundleSize()];

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
  external: configBase.external.concat(['fs', 'path']),
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
    ignore(['fs', 'path']),
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
