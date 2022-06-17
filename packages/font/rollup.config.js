import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import pkg from './package.json';
import nodePolyfills from 'rollup-plugin-polyfill-node'

const cjs = {
  format: 'cjs',
  exports: 'named',
};

const esm = {
  format: 'es',
};

const getCJS = override => Object.assign({}, cjs, override);
const getESM = override => Object.assign({}, esm, override);

const input = './src/index.js';

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
  plugins: [
    ['@babel/plugin-transform-runtime', { version: '^7.16.4' }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
});

const getExternal = () => [
  '@babel/runtime/regenerator',
  '@babel/runtime/helpers/extends',
  '@babel/runtime/helpers/asyncToGenerator',
  '@babel/runtime/helpers/objectWithoutPropertiesLoose',
  ...(Object.keys(pkg.dependencies)),
];

const getPlugins = ({ browser }) => [
  babel(babelConfig({ browser })),
  replace({
    preventAssignment: true,
    values: {
      BROWSER: JSON.stringify(browser),
    },
  }),
  ...(browser ? [
    nodePolyfills({ include: [ /\/font\/src\/.*\.js/, /polyfill/ ] }),
  ] : []),
];

const serverConfig = {
  input,
  output: [
    getESM({ file: 'lib/index.es.js' }),
    getCJS({ file: 'lib/index.cjs.js' }),
  ],
  external: getExternal(),
  plugins: getPlugins({ browser: false }),
};

const browserConfig = {
  input,
  output: [
    getESM({ file: 'lib/index.browser.es.js' }),
    getCJS({ file: 'lib/index.browser.cjs.js' }),
  ],
  external: getExternal(),
  plugins: getPlugins({ browser: true }),
};

export default [serverConfig, browserConfig];
