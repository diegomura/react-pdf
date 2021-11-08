import babel from 'rollup-plugin-babel';
import alias from '@rollup/plugin-alias';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import inject from '@rollup/plugin-inject';
import path from 'path';

const babelExternals = [
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
  external: ['stream', 'blob', ...babelExternals],
  plugins: [
    babel(babelConfig({ browser: false })),
    alias({
      entries: [
        {
          find: './stream-browser',
          replacement: 'stream',
        },
      ],
    }),
  ],
});

const browserConfig = ({ file, format }) => ({
  input: './src/index.js',
  output: {
    format,
    file,
    exports: 'named',
  },
  external: ['buffer/', 'process/browser', 'events', 'blob', ...babelExternals],
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
    babel(babelConfig({ browser: true })),
    resolve({ browser: true }),
    commonjs(),
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
