import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';

import trimReconciler from './build/trim-reconciler.js';

export default [
  {
    input: 'src/index.ts',
    output: { format: 'es', file: 'lib/index.js' },
    external: [
      './reconciler-23.js',
      './reconciler-31.js',
      './reconciler-33.js',
    ],
    plugins: [typescript()],
  },
  {
    input: 'src/reconciler-23.ts',
    output: { format: 'es', file: 'lib/reconciler-23.js' },
    plugins: [
      typescript(),
      resolve({ resolveOnly: ['react-reconciler-23'] }),
      commonjs({ esmExternals: (id) => id === 'scheduler' }),
      trimReconciler(),
      terser({ compress: { dead_code: true } }),
    ],
  },
  {
    input: 'src/reconciler-31.ts',
    output: { format: 'es', file: 'lib/reconciler-31.js' },
    plugins: [
      typescript(),
      resolve({ resolveOnly: ['react-reconciler-31'] }),
      commonjs({ esmExternals: (id) => id === 'scheduler' }),
      trimReconciler(),
      terser({ compress: { dead_code: true } }),
    ],
  },
  {
    input: 'src/reconciler-33.ts',
    output: { format: 'es', file: 'lib/reconciler-33.js' },
    plugins: [
      typescript(),
      resolve({ resolveOnly: ['react-reconciler-33'] }),
      commonjs({ esmExternals: (id) => id === 'scheduler' }),
      trimReconciler(),
      terser({ compress: { dead_code: true } }),
    ],
  },
  {
    input: './lib/types/index.d.ts',
    output: [{ file: 'lib/index.d.ts', format: 'es' }],
    plugins: [dts(), del({ targets: 'lib/types', hook: 'buildEnd' })],
  },
];
