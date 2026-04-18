import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import ignore from 'rollup-plugin-ignore';
import alias from '@rollup/plugin-alias';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json' with { type: 'json' };

const input = 'src/index.js';

const babelConfig = () => ({
  babelrc: true,
  exclude: 'node_modules/**',
  babelHelpers: 'runtime'
});

const getExternal = ({ browser }) => [
  ...Object.keys(pkg.dependencies).filter(
    (dep) => !browser || !['vite-compatible-readable-stream'].includes(dep)
  ),
  /@babel\/runtime/,
  'js-md5',
  '@noble/hashes/sha256',
  '@noble/ciphers/aes',
  ...(browser ? [] : ['fs'])
];

const getPlugins = ({ browser }) => [
  json(),
  ...(browser
    ? [
        ignore(['fs']),
        alias({
          entries: [
            { find: 'stream', replacement: 'vite-compatible-readable-stream' }
          ]
        }),
        commonjs(),
        nodeResolve({ browser, preferBuiltins: !browser }),
        nodePolyfills({
          include: [/node_modules\/.+\.js/, /pdfkit\/src\/.*\.js/]
        })
      ]
    : [nodeResolve({ browser, preferBuiltins: !browser })]),
  replace({
    preventAssignment: true,
    values: {
      BROWSER: JSON.stringify(browser)
    }
  }),
  babel(babelConfig()),
];

const serverConfig = {
  input,
  output: { format: 'es', file: 'lib/pdfkit.js' },
  external: getExternal({ browser: false }),
  plugins: getPlugins({ browser: false })
};

const browserConfig = {
  input,
  output: { format: 'es', file: 'lib/pdfkit.browser.js' },
  external: getExternal({ browser: true }),
  plugins: getPlugins({ browser: true })
};

export default [
  serverConfig,
  browserConfig,
];
