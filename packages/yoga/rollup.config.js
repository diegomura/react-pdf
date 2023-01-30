import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const babelConfig = () => ({
  babelrc: true,
  babelHelpers: 'runtime',
});

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/index.js',
      exports: 'auto',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
  ],
  plugins: [commonjs(), nodeResolve(), babel(babelConfig())],
  external: [/@babel\/runtime/],
};
