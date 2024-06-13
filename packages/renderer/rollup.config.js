import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import ignore from 'rollup-plugin-ignore';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';

import pkg from './package.json' assert { type: 'json' };

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
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
];

const getPlugins = ({ browser, declarationDests, minify = false }) => [
  json(),
  ...(browser ? [ignore(['fs', 'path', 'url'])] : []),
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
  output: { file: 'lib/react-pdf.js', format: 'es', sourcemap: true },
  external: getExternal({ browser: false }),
  plugins: getPlugins({
    browser: false,
    declarationDests: ['lib/react-pdf.d.ts', 'lib/react-pdf.d.cts'],
  }),
};

const serverProdConfig = {
  input: nodeInput,
  output: { file: 'lib/react-pdf.min.js', sourcemap: false, format: 'es' },
  external: getExternal({ browser: false }),
  plugins: getPlugins({
    browser: false,
    declarationDests: ['lib/react-pdf.min.d.ts', 'lib/react-pdf.min.d.cts'],
    minify: true,
  }),
};

const browserConfig = {
  input: domInput,
  output: { file: 'lib/react-pdf.browser.js', format: 'es', sourcemap: true },
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
  output: { file: 'lib/react-pdf.browser.min.js', format: 'es' },
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
