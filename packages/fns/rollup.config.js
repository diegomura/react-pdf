import babel from '@rollup/plugin-babel';

const input = 'src/index.js';

const output = { format: 'es', file: 'lib/index.js' };

const getExternal = () => [/@babel\/runtime/];

const getPlugins = () => [
  babel({
    babelrc: true,
    babelHelpers: 'runtime',
    exclude: 'node_modules/**',
  }),
];

const config = {
  input,
  output,
  external: getExternal(),
  plugins: getPlugins(),
};

export default config;
