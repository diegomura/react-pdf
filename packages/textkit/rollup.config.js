import babel from '@rollup/plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';
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

const input = './src/index.js';

const getExternal = ({ browser }) => [...Object.keys(pkg.dependencies)];

const getPlugins = ({ browser }) => [localResolve(), babel(babelConfig())];

const serverConfig = {
  input,
  output: [
    getESM({ file: 'lib/textkit.es.js' }),
    getCJS({ file: 'lib/textkit.cjs.js' }),
  ],
  external: getExternal({ browser: false }),
  plugins: getPlugins({ browser: false }),
};

const browserConfig = {
  input,
  output: [
    getESM({ file: 'lib/textkit.browser.es.js' }),
    getCJS({ file: 'lib/textkit.browser.cjs.js' }),
  ],
  external: getExternal({ browser: true }),
  plugins: getPlugins({ browser: true }),
};

export default [serverConfig, browserConfig];
