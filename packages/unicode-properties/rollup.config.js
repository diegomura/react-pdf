import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import pkg from './package.json';

const cjs = {
  exports: 'named',
  format: 'cjs',
};

const esm = {
  format: 'es',
};

const getCJS = override => Object.assign({}, cjs, override);
const getESM = override => Object.assign({}, esm, override);

const input = 'index.js';

const babelConfig = ({ browser }) => ({
  babelrc: false,
  babelHelpers: 'runtime',
  exclude: 'node_modules/**',
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        targets: { node: '12', browsers: 'last 2 versions' },
      },
    ],
  ],
  plugins: [['@babel/plugin-transform-runtime', { version: '^7.16.4' }]],
});

const getExternal = () => [
  ...(Object.keys(pkg.dependencies)),
];

const getPlugins = ({ browser }) => [
  json(),
  babel(babelConfig({ browser })),
  ...(browser ? [ nodePolyfills({ include: [ /unicode-properties\/index\.js/, /polyfill/ ] }) ] : []),
];

const serverConfig = {
  input,
  output: [
    getESM({ file: 'lib/unicode-properties.es.js' }),
    getCJS({ file: 'lib/unicode-properties.cjs.js' }),
  ],
  external: getExternal(),
  plugins: getPlugins({ browser: false }),
};

const browserConfig = {
  input,
  output: [
    getESM({ file: 'lib/unicode-properties.browser.es.js' }),
    getCJS({ file: 'lib/unicode-properties.browser.cjs.js' }),
  ],
  external: getExternal(),
  plugins: getPlugins({ browser: true }),
};

export default [serverConfig, browserConfig];
