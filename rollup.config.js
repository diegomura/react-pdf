import json from 'rollup-plugin-json';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import ignore from 'rollup-plugin-ignore';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
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
  external: [
    '@babel/runtime/helpers/extends',
    '@babel/runtime/helpers/asyncToGenerator',
    '@babel/runtime/regenerator',
    '@babel/runtime/helpers/createClass',
    '@babel/runtime/helpers/objectWithoutPropertiesLoose',
    '@babel/runtime/helpers/inheritsLoose',
    '@babel/runtime/helpers/assertThisInitialized',
    '@react-pdf/textkit/layout',
    '@react-pdf/textkit/renderers/pdf',
    '@react-pdf/textkit/attributedString',
    '@react-pdf/textkit/engines/linebreaker',
    '@react-pdf/textkit/engines/justification',
    '@react-pdf/textkit/engines/textDecoration',
    '@react-pdf/textkit/engines/scriptItemizer',
    '@react-pdf/textkit/engines/wordHyphenation',
    '@react-pdf/textkit/run/advanceWidth',
    '@react-pdf/textkit/attributedString/advanceWidth',
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
  external: configBase.external.concat(['fs', 'path', 'url']),
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
  input: './src/dom.js',
  output: [
    getESM({ file: 'dist/react-pdf.browser.es.js' }),
    getCJS({ file: 'dist/react-pdf.browser.cjs.js' }),
  ],
  plugins: [...getPlugins({ browser: true }), ignore(['fs', 'path', 'url'])],
};

const browserProdConfig = {
  ...browserConfig,
  output: [
    getESM({ file: 'dist/react-pdf.browser.es.min.js' }),
    getCJS({ file: 'dist/react-pdf.browser.cjs.min.js' }),
  ],
  plugins: browserConfig.plugins.concat(terser()),
};

export default [
  serverConfig,
  serverProdConfig,
  browserConfig,
  browserProdConfig,
];
