import babel from 'rollup-plugin-babel';
import alias from '@rollup/plugin-alias';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import inject from '@rollup/plugin-inject';
import path from 'path';

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
        ...(browser ? {} : { targets: { node: '12' } }),
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
});

const serverConfig = ({ file, format }) => ({
  input: './src/index.js',
  output: {
    format,
    file,
    exports: 'named',
  },
  external: ['stream', 'blob'],
  plugins: [
    alias({
      entries: [
        {
          // replace stream shim with native stream module for nodejs
          find: './stream-browser',
          replacement: 'stream',
        },
      ],
    }),
    babel(babelConfig({ browser: false })),
  ],
});

/*
 * rollup config for browser compatible stream
 *
 * https://github.com/nodejs/readable-stream use process and buffer node dependencies, so it
 * can't be used in browser with default webpack or vite config, so this config includes
 * `readable-stream` and solves various problems with configuration
 */

const browserConfig = ({ file, format }) => ({
  input: './src/index.js',
  output: {
    format,
    file,
    exports: 'named',
  },
  // browser external packages and polyfills
  external: ['buffer/', 'process/browser', 'events', 'blob'],
  plugins: [
    alias({
      entries: [
        {
          /*
           * `stream_duplex` creates a circular dependency and breaks rollup build
           * https://github.com/nodejs/readable-stream/issues/348
           *
           * `@react-pdf` don't use `stream_duplex`, so it replaced with empty function
           */
          find: './_stream_duplex',
          replacement: path.join(__dirname, './src/nope-duplex'),
        },
        {
          /*
           * `readable-stream` uses `buffer` and this is browser compatible replacement
           * https://github.com/feross/buffer#usage
           */
          find: 'buffer',
          replacement: 'buffer/',
        },
      ],
    }),
    babel(babelConfig({ browser: true })),
    resolve({ browser: true }),
    commonjs(),
    /*
     * `readable-stream` uses node global `process` this plugin injects process shim for browser
     */
    inject({
      process: 'process/browser',
    }),
  ],
});

export default [
  serverConfig({ file: 'lib/index.cjs.js', format: 'cjs' }),
  serverConfig({ file: 'lib/index.esm.js', format: 'esm' }),
  browserConfig({ file: 'lib/index.browser.cjs.js', format: 'cjs' }),
  browserConfig({ file: 'lib/index.browser.esm.js', format: 'esm' }),
];
