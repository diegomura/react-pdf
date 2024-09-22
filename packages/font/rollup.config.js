import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import pkg from './package.json' assert { type: 'json' };

const babelConfig = () => ({
  babelrc: true,
  exclude: 'node_modules/**',
  babelHelpers: 'runtime',
});

const external = [/@babel\/runtime/, ...Object.keys(pkg.dependencies)];

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
  output: { format: 'es', file: 'lib/index.js' },
  external,
  plugins: getPlugins({ browser: false }),
};

const browserConfig = {
  input: './src/index.js',
  output: { format: 'es', file: 'lib/index.browser.js' },
  external,
  plugins: getPlugins({ browser: true }),
};

export default [serverConfig, browserConfig];
