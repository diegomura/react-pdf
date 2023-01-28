import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';

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
  plugins: [commonjs(), nodeResolve()],
};
