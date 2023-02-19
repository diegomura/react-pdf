import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import ignore from 'rollup-plugin-ignore';
import pkg from './package.json';
import nodePolyfills from 'rollup-plugin-polyfill-node';

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

const babelConfig = () => ({
  babelrc: true,
  exclude: 'node_modules/**',
  babelHelpers: 'runtime',
});

const getExternal = ({ browser }) => [
  /@babel\/runtime/,
  ...Object.keys(pkg.dependencies),
  ...(browser ? [] : ['fs', 'path', 'url']),
];

const getPlugins = ({ browser }) => [
  babel(babelConfig()),
  replace({
    preventAssignment: true,
    values: { BROWSER: JSON.stringify(browser) },
  }),
  ...(browser
    ? [
        ignore(['fs', 'path', 'url']),
        nodePolyfills({
          include: [/node_modules\/.+\.js/, /\/image\/src\/.*\.js/],
        }),
      ]
    : []),
];

const serverConfig = {
  input,
  output: [
    getESM({ file: 'lib/index.es.js' }),
    getCJS({ file: 'lib/index.cjs.js' }),
  ],
  external: getExternal({ browser: false }),
  plugins: getPlugins({ browser: false }),
};

const browserConfig = {
  input,
  output: [
    getESM({ file: 'lib/index.browser.es.js' }),
    getCJS({ file: 'lib/index.browser.cjs.js' }),
  ],
  external: getExternal({ browser: true }),
  plugins: getPlugins({ browser: true }),
};

export default [serverConfig, browserConfig];
