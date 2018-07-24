import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import sourceMaps from 'rollup-plugin-sourcemaps';
import bundleSize from 'rollup-plugin-bundle-size';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
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

const commonPlugins = [
  sourceMaps(),
  nodeResolve(),
  babel({
    babelrc: false,
    presets: [['es2015', { modules: false }], 'react', 'stage-2'],
    plugins: ['external-helpers'],
    runtimeHelpers: true,
  }),
  bundleSize(),
];

const configBase = {
  globals: { react: 'React' },
  external: [
    'fbjs/lib/emptyObject',
    'fbjs/lib/warning',
    '@react-pdf/pdfkit',
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

const nativeConfig = Object.assign({}, configBase, {
  input: './src/native.js',
  output: [
    getESM({ file: 'dist/react-pdf.native.es.js' }),
    getCJS({ file: 'dist/react-pdf.native.cjs.js' }),
  ],
  plugins: [
    globals(),
    builtins(),
    ...configBase.plugins,
    replace({
      BROWSER: JSON.stringify(true),
    }),
    ignore(['fs', 'path']),
  ],
  // external: configBase.external.filter(id => id !== 'blob-stream')
});

const nativeProdConfig = Object.assign({}, nativeConfig, {
  output: [
    getESM({ file: 'dist/react-pdf.native.es.min.js' }),
    getCJS({ file: 'dist/react-pdf.native.cjs.min.js' }),
  ],
  plugins: browserConfig.plugins.concat(uglify()),
});

export default [
  serverConfig,
  serverProdConfig,
  browserConfig,
  browserProdConfig,
  nativeConfig,
  nativeProdConfig,
];
