import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import sourceMaps from 'rollup-plugin-sourcemaps';
import ignore from 'rollup-plugin-ignore';
import pkg from './package.json';

const cjs = {
  exports: 'named',
  format: 'cjs',
  sourcemap: true,
};

const esm = {
  format: 'es',
  sourcemap: true,
};

const getCJS = override => Object.assign({}, cjs, override);
const getESM = override => Object.assign({}, esm, override);

const commonPlugins = [
  sourceMaps(),
  nodeResolve(),
  babel({
    exclude: 'node_modules/**',
  }),
];

const configBase = {
  globals: { react: 'React' },
  external: ['react', 'prop-types'].concat(
    Object.keys(pkg.dependencies),
    Object.keys(pkg.peerDependencies),
  ),
  plugins: commonPlugins,
  // sourcemap: true,
};

const nodeConfig = Object.assign({}, configBase, {
  input: './src/node/index.js',
  external: ['fs'],
  output: [
    getESM({ file: 'dist/react-pdf.esm.js' }),
    getCJS({ file: 'dist/react-pdf.cjs.js' }),
  ],
  plugins: configBase.plugins.concat(
    replace({
      __SERVER__: JSON.stringify(true),
    }),
  ),
});

const browserConfig = Object.assign({}, configBase, {
  input: './src/dom/index.js',
  output: [
    getESM({ file: 'dist/react-pdf.browser.esm.js' }),
    getCJS({ file: 'dist/react-pdf.browser.cjs.js' }),
  ],
  plugins: configBase.plugins.concat(
    replace({
      __SERVER__: JSON.stringify(false),
    }),
    ignore(['fs']),
  ),
});

export default [nodeConfig, browserConfig];
