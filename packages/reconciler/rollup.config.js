/* eslint-disable import/extensions */

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

import trimReconciler from './build/trim-reconciler.js';

export default {
  input: 'src/index.js',
  output: { format: 'es', file: 'lib/index.js' },
  plugins: [
    resolve({ resolveOnly: ['react-reconciler'] }),
    commonjs({ esmExternals: (id) => id === 'scheduler' }),
    trimReconciler(),
    terser({ compress: { dead_code: true } }),
  ],
};
