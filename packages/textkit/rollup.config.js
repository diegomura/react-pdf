import localResolve from 'rollup-plugin-local-resolve';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';

import pkg from './package.json' with { type: 'json' };

const input = './src/index.ts';

const getExternal = () => [...Object.keys(pkg.dependencies), /hyphen/];

const getPlugins = () => [typescript(), localResolve()];

const config = {
  input,
  output: { format: 'es', file: 'lib/textkit.js' },
  external: getExternal(),
  plugins: getPlugins(),
};

const dtsConfig = {
  input: './lib/types/index.d.ts',
  output: [{ file: 'lib/index.d.ts', format: 'es' }],
  plugins: [dts(), del({ targets: 'lib/types', hook: 'buildEnd' })],
};

export default [config, dtsConfig];
