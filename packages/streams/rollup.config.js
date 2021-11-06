import babel from 'rollup-plugin-babel';
import alias from '@rollup/plugin-alias';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import inject from '@rollup/plugin-inject';
import path from 'path';

const external = [
  '@babel/runtime/regenerator',
  '@babel/runtime/helpers/extends',
  '@babel/runtime/helpers/asyncToGenerator',
  '@babel/runtime/helpers/objectWithoutPropertiesLoose',
];

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

const serverConfig = {
  input: './src/index.js',
  output: {
    format: 'cjs',
    file: 'lib/index.cjs.js',
    exports: 'named',
  },
  external: ['stream', 'blob'],
  plugins: [
    // babel(babelConfig({ browser: false })),
    alias({
      entries: [
        {
          find: './stream-browser',
          replacement: 'stream',
        },
      ],
    }),
  ],
};

const browserConfig = {
  input: './src/index.js',
  output: {
    format: 'esm',
    file: 'lib/index.browser.js',
    exports: 'named',
  },
  external: ['buffer/', 'process/browser', 'events', 'blob'],
  plugins: [
    alias({
      entries: [
        {
          find: './_stream_duplex',
          replacement: path.join(__dirname, './src/nope-duplex'),
        },
        {
          find: 'buffer',
          replacement: 'buffer/',
        },
      ],
    }),
    // babel(babelConfig({ browser: true })),
    resolve({ browser: true }),
    commonjs(),
    inject({
      process: 'process/browser',
    }),
  ],
};

export default [serverConfig, browserConfig];
