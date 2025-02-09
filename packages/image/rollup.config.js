import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import ignore from 'rollup-plugin-ignore';
import nodePolyfills from 'rollup-plugin-polyfill-node';

import pkg from './package.json' with { type: 'json' };

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
  output: { format: 'es', file: 'lib/index.js' },
  external: getExternal({ browser: false }),
  plugins: getPlugins({ browser: false }),
};

const browserConfig = {
  input,
  output: { format: 'es', file: 'lib/index.browser.js' },
  external: getExternal({ browser: true }),
  plugins: getPlugins({ browser: true }),
};

export default [serverConfig, browserConfig];
