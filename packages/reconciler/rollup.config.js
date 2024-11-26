/* eslint-disable import/extensions */

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

import trimReconciler from './build/trim-reconciler.js';

export default [
  {
    input: 'src/index.js',
    output: { format: 'es', file: 'lib/index.js' },
    external: ['./reconciler-23.js', './reconciler-31.js'],
  },
  {
    input: 'src/reconciler-23.js',
    output: { format: 'es', file: 'lib/reconciler-23.js' },
    plugins: [
      resolve({ resolveOnly: ['react-reconciler-23'] }),
      commonjs({ esmExternals: (id) => id === 'scheduler' }),
      trimReconciler(),
      terser({ compress: { dead_code: true } }),
    ],
  },
  {
    input: 'src/reconciler-31.js',
    output: { format: 'es', file: 'lib/reconciler-31.js' },
    plugins: [
      resolve({ resolveOnly: ['react-reconciler-31'] }),
      commonjs({ esmExternals: (id) => id === 'scheduler' }),
      trimReconciler(),
      terser({ compress: { dead_code: true } }),
    ],
  },
];
