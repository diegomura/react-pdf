import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import ignore from 'rollup-plugin-ignore';

import pkg from './package.json' with { type: 'json' };

const input = 'src/index.js';

const babelConfig = () => ({
  babelrc: true,
  babelHelpers: 'runtime',
  exclude: 'node_modules/**',
});

const getExternal = ({ browser }) =>
  browser ? [...Object.keys(pkg.dependencies), 'zlib'] : ['fs', 'zlib'];

const getPlugins = ({ browser }) => [
  ...(browser ? [ignore(['fs'])] : []),
  babel(babelConfig()),
  replace({
    preventAssignment: true,
    values: {
      BROWSER: JSON.stringify(browser),
    },
  }),
];

const getTreeshake = ({ browser }) => ({
  moduleSideEffects: (id) => (browser ? id !== 'zlib' : id !== 'fflate'),
});

const serverConfig = {
  input,
  output: { format: 'es', file: 'lib/png-js.js' },
  external: getExternal({ browser: false }),
  plugins: getPlugins({ browser: false }),
  treeshake: getTreeshake({ browser: false }),
};

const browserConfig = {
  input,
  output: { format: 'es', file: 'lib/png-js.browser.js' },
  external: getExternal({ browser: true }),
  plugins: getPlugins({ browser: true }),
  treeshake: getTreeshake({ browser: true }),
};

export default [serverConfig, browserConfig];
