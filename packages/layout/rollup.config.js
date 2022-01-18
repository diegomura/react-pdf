import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';

import pkg from './package.json';

const external = [
  '@babel/runtime/helpers/objectWithoutPropertiesLoose',
  '@babel/runtime/helpers/asyncToGenerator',
  '@babel/runtime/helpers/createClass',
  '@babel/runtime/helpers/extends',
  '@babel/runtime/regenerator',
  '@react-pdf/stylesheet/lib/flatten',
  '@react-pdf/textkit/lib/layout',
  '@react-pdf/textkit/lib/engines/linebreaker',
  '@react-pdf/textkit/lib/engines/justification',
  '@react-pdf/textkit/lib/engines/textDecoration',
  '@react-pdf/textkit/lib/engines/scriptItemizer',
  '@react-pdf/textkit/lib/engines/wordHyphenation',
  '@react-pdf/textkit/lib/attributedString',
  ...Object.keys(pkg.dependencies),
];

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

const serverConfig = {
  input: './src/index.js',
  output: {
    format: 'cjs',
    file: 'lib/index.js',
    exports: 'named',
  },
  external,
  plugins: [
    babel(babelConfig({ browser: false })),
    replace({
      preventAssignment: true,
      values: { BROWSER: JSON.stringify(false) },
    }),
  ],
};

const browserConfig = {
  input: './src/index.js',
  output: {
    format: 'esm',
    file: 'lib/index.esm.js',
    exports: 'named',
  },
  external,
  plugins: [
    babel(babelConfig({ browser: true })),
    replace({
      preventAssignment: true,
      values: { BROWSER: JSON.stringify(true) },
    }),
  ],
};

export default [serverConfig, browserConfig];
