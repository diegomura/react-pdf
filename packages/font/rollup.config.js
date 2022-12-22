import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import pkg from './package.json';

const cjs = {
  format: 'cjs',
  exports: 'named',
};

const esm = {
  format: 'es',
};

const getCJS = override => Object.assign({}, cjs, override);
const getESM = override => Object.assign({}, esm, override);

const babelConfig = () => ({
  babelrc: true,
  exclude: 'node_modules/**',
  babelHelpers: 'runtime',
});

const external = [
  '@babel/runtime/regenerator',
  '@babel/runtime/helpers/extends',
  '@babel/runtime/helpers/asyncToGenerator',
  '@babel/runtime/helpers/objectWithoutPropertiesLoose',
  ...Object.keys(pkg.dependencies),
];

const getPlugins = ({ browser }) => [
  babel(babelConfig()),
  replace({
    preventAssignment: true,
    values: {
      BROWSER: JSON.stringify(browser),
    },
  }),
];

const serverConfig = {
  input: './src/index.js',
  output: [
    getESM({ file: 'lib/index.mjs' }),
    getCJS({ file: 'lib/index.cjs.js' }),
  ],
  external,
  plugins: getPlugins({ browser: false }),
};

const browserConfig = {
  input: './src/index.js',
  output: [
    getESM({ file: 'lib/index.browser.mjs' }),
    getCJS({ file: 'lib/index.browser.cjs.js' }),
  ],
  external,
  plugins: getPlugins({ browser: true }),
};

export default [serverConfig, browserConfig];
