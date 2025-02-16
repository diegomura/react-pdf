import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import typescript from '@rollup/plugin-typescript';

import replace from '@rollup/plugin-replace';

import pkg from './package.json' with { type: 'json' };

const input = './src/index.ts';

const external = Object.keys(pkg.dependencies);

const getPlugins = ({ browser }) => [
  typescript(),
  replace({
    preventAssignment: true,
    values: {
      BROWSER: JSON.stringify(browser),
    },
  }),
];

const serverConfig = {
  input,
  output: { format: 'es', file: 'lib/index.js' },
  external,
  plugins: getPlugins({ browser: false }),
};

const browserConfig = {
  input,
  output: { format: 'es', file: 'lib/index.browser.js' },
  external,
  plugins: getPlugins({ browser: true }),
};

const dtsConfig = {
  input: './lib/types/index.d.ts',
  output: [{ file: 'lib/index.d.ts', format: 'es' }],
  plugins: [dts(), del({ targets: 'lib/types', hook: 'buildEnd' })],
};

export default [serverConfig, browserConfig, dtsConfig];
