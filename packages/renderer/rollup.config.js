import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import ignore from 'rollup-plugin-ignore';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';

import pkg from './package.json' with { type: 'json' };

const cjs = {
  exports: 'named',
  format: 'cjs',
  interop: 'compat',
  sourcemap: true,
};

const esm = {
  format: 'es',
  sourcemap: true,
};

const getCJS = (override) => Object.assign({}, cjs, override);
const getESM = (override) => Object.assign({}, esm, override);

const nodeInput = './src/node/index.js';
const domInput = './src/dom/index.js';

const babelConfig = () => ({
  babelrc: true,
  exclude: 'node_modules/**',
  babelHelpers: 'runtime',
  presets: [['@babel/preset-react', { runtime: 'automatic' }]],
});

const getExternal = ({ browser }) => [
  /@babel\/runtime/,
  'react/jsx-runtime',
  ...(browser ? [] : ['fs', 'path', 'url']),
  ...Object.keys(pkg.dependencies).filter(
    (name) => name !== 'react-reconciler',
  ),
  ...Object.keys(pkg.peerDependencies),
];

const getPlugins = ({ browser, declarationDests, minify = false }) => [
  json(),
  ...(browser ? [ignore(['fs', 'path', 'url'])] : []),
  alias({
    entries: {
      'react-reconciler':
        'react-reconciler/cjs/react-reconciler.production.min.js',
    },
  }),
  babel(babelConfig()),
  commonjs({
    esmExternals: ['scheduler'],
  }),
  nodeResolve({ browser, preferBuiltins: !browser }),
  replace({
    preventAssignment: true,
    values: {
      BROWSER: JSON.stringify(browser),
    },
  }),
  copy({
    targets: declarationDests.map((destPath) => {
      const [dest, rename] = destPath.split('/');
      return { src: 'index.d.ts', dest, rename };
    }),
  }),
  ...(minify ? [terser()] : []),
];

const serverConfig = {
  input: nodeInput,
  output: [
    getESM({ file: 'lib/react-pdf.js' }),
    getCJS({ file: 'lib/react-pdf.cjs' }),
  ],
  external: getExternal({ browser: false }),
  plugins: getPlugins({
    browser: false,
    declarationDests: ['lib/react-pdf.d.ts', 'lib/react-pdf.d.cts'],
  }),
};

const serverProdConfig = {
  input: nodeInput,
  output: [
    getESM({ file: 'lib/react-pdf.min.js', sourcemap: false }),
    getCJS({ file: 'lib/react-pdf.min.cjs', sourcemap: false }),
  ],
  external: getExternal({ browser: false }),
  plugins: getPlugins({
    browser: false,
    declarationDests: ['lib/react-pdf.min.d.ts', 'lib/react-pdf.min.d.cts'],
    minify: true,
  }),
};

const browserConfig = {
  input: domInput,
  output: [
    getESM({ file: 'lib/react-pdf.browser.js' }),
    getCJS({ file: 'lib/react-pdf.browser.cjs' }),
  ],
  external: getExternal({ browser: true }),
  plugins: getPlugins({
    browser: true,
    declarationDests: [
      'lib/react-pdf.browser.d.ts',
      'lib/react-pdf.browser.d.cts',
    ],
  }),
};

const browserProdConfig = {
  input: domInput,
  output: [
    getESM({ file: 'lib/react-pdf.browser.min.js', sourcemap: false }),
    getCJS({ file: 'lib/react-pdf.browser.min.cjs', sourcemap: false }),
  ],
  external: getExternal({ browser: true }),
  plugins: getPlugins({
    browser: true,
    declarationDests: [
      'lib/react-pdf.browser.min.d.ts',
      'lib/react-pdf.browser.min.d.cts',
    ],
    minify: true,
  }),
};

export default [
  serverConfig,
  serverProdConfig,
  browserConfig,
  browserProdConfig,
];
