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
  output: {
    globals: { react: 'React' },
    sourcemap: true,
  },
  external: [
    '@react-pdf/pdfkit',
    '@babel/runtime/core-js/promise',
    '@babel/runtime/helpers/objectWithoutProperties',
    '@babel/runtime/helpers/extends',
    '@babel/runtime/core-js/object/keys',
    '@babel/runtime/core-js/array/from',
    '@babel/runtime/core-js/json/stringify',
    '@babel/runtime/core-js/object/assign',
    '@babel/runtime/helpers/asyncToGenerator',
    '@babel/runtime/core-js/get-iterator',
    '@babel/runtime/helpers/inherits',
    '@babel/runtime/helpers/classCallCheck',
    '@babel/runtime/helpers/possibleConstructorReturn',
    '@babel/runtime/regenerator',
    '@babel/runtime/helpers/createClass',
    '@babel/runtime/helpers/typeof',
  ].concat(Object.keys(pkg.dependencies), Object.keys(pkg.peerDependencies)),
  plugins: commonPlugins,
};

const getPlugins = ({ browser }) => [
  ...configBase.plugins,
  babel(babelConfig({ browser })),
  replace({
    BROWSER: JSON.stringify(browser),
  }),
];

const minifyConfig = config => ({
  ...config,
  output: { ...config.output, minify: true },
});

const serverConfig = {
  ...configBase,
  input: './src/node.js',
  plugins: getPlugins({ browser: false }),
  external: configBase.external.concat(['fs', 'path', 'url']),
};

const serverProdConfig = minifyConfig(serverConfig);

const browserConfig = {
  ...configBase,
  input: './src/dom.js',
  plugins: [...getPlugins({ browser: true }), ignore(['fs', 'path', 'url'])],
};

const browserProdConfig = minifyConfig(browserConfig);

const moduleOutputs = {
  cjs: {
    exports: 'named',
    format: 'cjs',
    sourcemap: true,
  },
  esm: {
    format: 'es',
    sourcemap: true,
  },
};

const getModulesConfig = config =>
  Object.values(moduleOutputs).map(output => ({
    ...config,
    output: {
      ...configBase.output,
      ...output,
      file: `dist/react-pdf${
        config.input === './src/dom.js' ? '.browser' : ''
        }.${output.format}${config.output.minify ? '.min' : ''}.js`,
    },
    plugins: config.output.minify
      ? [...config.plugins, terser()]
      : config.plugins,
    onwarn,
  }));

const outputs = [
  serverConfig,
  serverProdConfig,
  browserConfig,
  browserProdConfig,
]
  .map(getModulesConfig)
  .reduce((a, c) => [...a, ...c], []);

export default outputs;
