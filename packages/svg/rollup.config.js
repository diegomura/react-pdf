import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import typescript from '@rollup/plugin-typescript';

const input = './src/index.ts';

const mainConfig = {
  input,
  output: { format: 'es', file: 'lib/index.js' },
  external: ['@react-pdf/primitives'],
  plugins: [typescript()],
};

const dtsConfig = {
  input: './lib/types/index.d.ts',
  output: [{ file: 'lib/index.d.ts', format: 'es' }],
  plugins: [dts(), del({ targets: 'lib/types', hook: 'buildEnd' })],
};

export default [mainConfig, dtsConfig];
