import json from 'rollup-plugin-json';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import ignore from 'rollup-plugin-ignore';
import replace from 'rollup-plugin-replace';
import sourceMaps from 'rollup-plugin-sourcemaps';
import bundleSize from 'rollup-plugin-bundle-size';
import nodeResolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';
import chalk from 'chalk';

const moduleAliases = {
  'yoga-layout': 'yoga-layout-prebuilt',
};

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

const ignoredCircular = [
  {
    importer: 'src/elements/index.js',
    message:
      'Circular dependency: src/elements/index.js -> src/elements/Page.js -> src/elements/index.js',
  },
];

const onwarn = warning => {
  if (
    warning.code === 'CIRCULAR_DEPENDENCY' &&
    ignoredCircular.some(
      circular =>
        circular.importer === warning.importer &&
        circular.message === warning.message,
    )
  ) {
    return;
  }
  console.warn(chalk.bold.yellow(`(!) ${warning.message}`));
};

const babelConfig = ({ browser }) => ({
  babelrc: false,
  exclude: 'node_modules/**',
  runtimeHelpers: true,
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        ...(browser ? {} : { targets: { node: '8.11.3' } }),
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-syntax-dynamic-import',
    'dynamic-import-node-babel-7',
  ],
});

const commonPlugins = [
  json(),
  sourceMaps(),
  alias(moduleAliases),
  nodeResolve(),
  //bundleSize(),
];

const configBase = {
  external: [
    '@babel/runtime/helpers/extends',
    '@babel/runtime/helpers/asyncToGenerator',
    '@babel/runtime/regenerator',
    '@babel/runtime/helpers/createClass',
    '@babel/runtime/helpers/objectWithoutPropertiesLoose',
    '@babel/runtime/helpers/inheritsLoose',
    '@babel/runtime/helpers/assertThisInitialized',
  ].concat(Object.keys(pkg.dependencies), Object.keys(pkg.peerDependencies)),
  plugins: commonPlugins,
  onwarn,
};

const getPlugins = ({ browser }) => [
  ...configBase.plugins,
  babel(babelConfig({ browser })),
  replace({
    BROWSER: JSON.stringify(browser),
  }),
];

const serverConfig = {
  ...configBase,
  input: './src/node.js',
  output: [
    getESM({ file: 'dist/react-pdf.es.js' }),
    getCJS({ file: 'dist/react-pdf.cjs.js' }),
  ],
  plugins: getPlugins({ browser: false }),
  external: configBase.external.concat(['fs', 'path', 'stream', 'url']),
};

const serverProdConfig = {
  ...serverConfig,
  output: [
    getESM({ file: 'dist/react-pdf.es.min.js' }),
    getCJS({ file: 'dist/react-pdf.cjs.min.js' }),
  ],
  plugins: serverConfig.plugins.concat(terser()),
};

const browserConfig = {
  ...configBase,
  manualChunks: {
    'yoga-layout-prebuilt': ['yoga-layout-prebuilt/yoga-layout/dist/entry-browser.js'],
    'yoga-dom': ['yoga-dom/dist/Yoga.es.js', 'yoga-dom/dist/Yoga.cjs.js'],
  },
  input: './src/dom.js',
  output: [
    getESM({ dir: 'dist/react-pdf.browser.es' }),
    getCJS({ dir: 'dist/react-pdf.browser.cjs' }),
  ],
  plugins: [...getPlugins({ browser: true }), ignore(['fs', 'path', 'url'])],
};

const browserProdConfig = {
  ...browserConfig,
  output: [
    getESM({ dir: 'dist/react-pdf.browser.es.min' }),
    getCJS({ dir: 'dist/react-pdf.browser.cjs.min' }),
  ],
  plugins: browserConfig.plugins.concat(terser()),
};

export default [
  serverConfig,
  serverProdConfig,
  browserConfig,
  browserProdConfig,
];
