import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import ignore from 'rollup-plugin-ignore';
import { terser } from 'rollup-plugin-terser';
import sourceMaps from 'rollup-plugin-sourcemaps';

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
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
  ],
});

const commonPlugins = [json(), nodeResolve(), sourceMaps()];

const configBase = {
  external: [
    '@babel/runtime/helpers/defineProperty',
    '@babel/runtime/helpers/slicedToArray',
    '@babel/runtime/helpers/extends',
    '@babel/runtime/helpers/objectWithoutProperties',
    '@babel/runtime/helpers/asyncToGenerator',
    '@babel/runtime/regenerator',
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

const serverConfig = {
  ...configBase,
  input: './src/node/index.js',
  output: [
    getESM({ file: 'lib/react-pdf.es.js' }),
    getCJS({ file: 'lib/react-pdf.cjs.js' }),
  ],
  plugins: getPlugins({ browser: false }),
  external: configBase.external.concat(['fs', 'path', 'url']),
};

const serverProdConfig = {
  ...serverConfig,
  output: [
    getESM({ file: 'lib/react-pdf.es.min.js' }),
    getCJS({ file: 'lib/react-pdf.cjs.min.js' }),
  ],
  plugins: serverConfig.plugins.concat(terser()),
};

const browserConfig = {
  ...configBase,
  input: './src/dom/index.js',
  output: [
    getESM({ file: 'lib/react-pdf.browser.es.js' }),
    getCJS({ file: 'lib/react-pdf.browser.cjs.js' }),
  ],
  plugins: [...getPlugins({ browser: true }), ignore(['fs', 'path', 'url'])],
};

const browserProdConfig = {
  ...browserConfig,
  output: [
    getESM({ file: 'lib/react-pdf.browser.es.min.js' }),
    getCJS({ file: 'lib/react-pdf.browser.cjs.min.js' }),
  ],
  plugins: browserConfig.plugins.concat(terser()),
};

export default [
  serverConfig,
  serverProdConfig,
  browserConfig,
  browserProdConfig,
];
