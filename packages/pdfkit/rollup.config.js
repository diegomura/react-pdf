import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import ignore from 'rollup-plugin-ignore';
import alias from '@rollup/plugin-alias';
import inject from '@rollup/plugin-inject';
import commonjs from '@rollup/plugin-commonjs';
import { createRequire } from 'module';

import pkg from './package.json' with { type: 'json' };

const require = createRequire(import.meta.url);
const stdLibBrowser = require('node-stdlib-browser');

const input = 'src/index.js';

const babelConfig = () => ({
  babelrc: true,
  exclude: 'node_modules/**',
  babelHelpers: 'runtime'
});

const getExternal = ({ browser }) => [
  ...Object.keys(pkg.dependencies).filter(
    (dep) =>
      !browser ||
      !['vite-compatible-readable-stream', 'browserify-zlib'].includes(dep)
  ),
  /\/node_modules\/pako\//,
  /@babel\/runtime/,
  'js-md5',
  '@noble/hashes/sha256',
  '@noble/ciphers/aes',
  ...(browser ? [] : ['fs'])
];

// node-stdlib-browser entries are absolute paths (they point at installed
// packages); these get bundled inline so the absolute paths are fine. Aliases
// for externalized modules (pako/*) MUST stay as bare specifiers so the
// consumer's bundler can resolve them.
const browserAliasEntries = {
  ...stdLibBrowser,
  // Override stdLibBrowser's stream-browserify with the vite-compatible variant
  // (bundled inline; nodeResolve will pick it up).
  stream: 'vite-compatible-readable-stream',
  // pako sub-paths fail to resolve without explicit .js suffix; see
  // https://github.com/browserify/browserify-zlib/pull/45
  'pako/lib/zlib/zstream': 'pako/lib/zlib/zstream.js',
  'pako/lib/zlib/constants': 'pako/lib/zlib/constants.js',
};

const getPlugins = ({ browser }) => [
  json(),
  ...(browser
    ? [
        ignore(['fs']),
        alias({
          entries: Object.entries(browserAliasEntries).map(([find, replacement]) => ({
            find,
            replacement
          }))
        }),
        commonjs(),
        nodeResolve({ browser, preferBuiltins: !browser }),
        inject({
          Buffer: [stdLibBrowser.buffer, 'Buffer'],
          process: stdLibBrowser.process
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
