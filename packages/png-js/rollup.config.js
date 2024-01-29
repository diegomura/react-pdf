import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import ignore from 'rollup-plugin-ignore';
import alias from '@rollup/plugin-alias';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import nodeResolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';
import commonjs from '@rollup/plugin-commonjs';

const cjs = {
  exports: 'named',
  format: 'cjs',
};

const esm = {
  format: 'es',
};

const getCJS = (override) => Object.assign({}, cjs, override);
const getESM = (override) => Object.assign({}, esm, override);

const input = 'src/index.js';

const babelConfig = () => ({
  babelrc: true,
  babelHelpers: 'runtime',
  exclude: 'node_modules/**',
});

const getExternal = ({ browser }) =>
  browser
    ? [
        ...Object.keys(pkg.dependencies).filter(
          (dep) => dep !== 'browserify-zlib',
        ),
      ]
    : ['fs', ...Object.keys(pkg.dependencies)];

const getPlugins = ({ browser }) => [
  ...(browser
    ? [
        ignore(['fs']),
        alias({
          entries: [{ find: 'zlib', replacement: 'browserify-zlib' }],
        }),
        commonjs(),
        nodeResolve({ browser, preferBuiltins: !browser }),
        nodePolyfills({
          include: [/node_modules\/.+\.js/, /\/png-js\/src\/.*\.js/],
        }),
      ]
    : []),
  babel(babelConfig()),
  replace({
    preventAssignment: true,
    values: {
      BROWSER: JSON.stringify(browser),
    },
  }),
];

const serverConfig = {
  input,
  output: [
    getESM({ file: 'lib/png-js.js' }),
    getCJS({ file: 'lib/png-js.cjs' }),
  ],
  external: getExternal({ browser: false }),
  plugins: getPlugins({ browser: false }),
};

const browserConfig = {
  input,
  output: [
    getESM({ file: 'lib/png-js.browser.js' }),
    getCJS({ file: 'lib/png-js.browser.cjs' }),
  ],
  external: getExternal({ browser: true }),
  plugins: getPlugins({ browser: true }),
};

export default [serverConfig, browserConfig];
