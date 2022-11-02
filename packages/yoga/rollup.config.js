import commonjs from '@rollup/plugin-commonjs';

const input = './src/dist/entry-browser.js';

const getPlugins = () => [commonjs()];

export default {
  input,
  output: {
    file: 'src/dist/entry-browser.mjs',
    format: 'es',
  },
  plugins: getPlugins(),
};
