import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import ignore from 'rollup-plugin-ignore';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import sourceMaps from 'rollup-plugin-sourcemaps';
import bundleSize from 'rollup-plugin-bundle-size';
import nodeResolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

const globals = { react: 'React' };

const cjs = {
  globals,
  format: 'cjs',
  exports: 'named',
  sourcemap: true,
};

const esm = {
  globals,
  format: 'es',
  sourcemap: true,
};

const getCJS = override => Object.assign({}, cjs, override);
const getESM = override => Object.assign({}, esm, override);

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

const commonPlugins = [json(), sourceMaps(), nodeResolve(), bundleSize()];

const configBase = {
  external: [
    '@babel/runtime/helpers/extends',
    '@babel/runtime/helpers/asyncToGenerator',
    '@babel/runtime/regenerator',
    '@babel/runtime/helpers/createClass',
    '@babel/runtime/helpers/objectWithoutPropertiesLoose',
    '@babel/runtime/helpers/inheritsLoose',
    '@babel/runtime/helpers/assertThisInitialized',
    '@react-pdf/textkit/lib/layout',
    '@react-pdf/textkit/lib/renderers/pdf',
    '@react-pdf/textkit/lib/attributedString',
    '@react-pdf/textkit/lib/engines/linebreaker',
    '@react-pdf/textkit/lib/engines/justification',
    '@react-pdf/textkit/lib/engines/textDecoration',
    '@react-pdf/textkit/lib/engines/scriptItemizer',
    '@react-pdf/textkit/lib/engines/wordHyphenation',
    '@react-pdf/textkit/lib/run/advanceWidth',
    '@react-pdf/textkit/lib/attributedString/advanceWidth',
  ].concat(Object.keys(pkg.dependencies), Object.keys(pkg.peerDependencies)),
  plugins: commonPlugins,
};

const getPlugins = ({ browser }) => [
  ...configBase.plugins,
  babel(babelConfig({ browser })),
  replace({
    BROWSER: JSON.stringify(browser),
  }),
];

const serverConfig = {
  ...configBase,
  input: './src/node.js',
  output: [
    getESM({ file: 'lib/react-pdf.es.js' }),
    getCJS({ file: 'lib/react-pdf.cjs.js' }),
  ],
  plugins: getPlugins({ browser: false }),
  external: configBase.external.concat(['fs', 'path', 'url']),
};

const serverProdConfig = {
  ...serverConfig,
  output: [
    getESM({ file: 'lib/react-pdf.es.min.js' }),
    getCJS({ file: 'lib/react-pdf.cjs.min.js' }),
  ],
  plugins: serverConfig.plugins.concat(terser()),
};

const browserConfig = {
  ...configBase,
  input: './src/dom.js',
  output: [
    getESM({ file: 'lib/react-pdf.browser.es.js' }),
    getCJS({ file: 'lib/react-pdf.browser.cjs.js' }),
  ],
  plugins: [...getPlugins({ browser: true }), ignore(['fs', 'path', 'url'])],
};

const browserProdConfig = {
  ...browserConfig,
  output: [
    getESM({ file: 'lib/react-pdf.browser.es.min.js' }),
    getCJS({ file: 'lib/react-pdf.browser.cjs.min.js' }),
  ],
  plugins: browserConfig.plugins.concat(terser()),
};

export default [
  serverConfig,
  serverProdConfig,
  browserConfig,
  browserProdConfig,
];
