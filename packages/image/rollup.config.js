import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import ignore from 'rollup-plugin-ignore';
import nodePolyfills from 'rollup-plugin-polyfill-node';

import pkg from './package.json' with { type: 'json' };

const input = './src/index.ts';

const getExternal = ({ browser }) => [
  ...Object.keys(pkg.dependencies),
  ...(browser ? [] : ['fs', 'path', 'url']),
];

const getPlugins = ({ browser }) => [
  typescript(),
  replace({
    preventAssignment: true,
    values: { BROWSER: JSON.stringify(browser) },
  }),
  ...(browser
    ? [ignore(['fs', 'path', 'url']), nodePolyfills({ include: null })]
    : []),
];

const serverConfig = {
  input,
  output: { format: 'es', file: 'lib/index.js' },
  external: getExternal({ browser: false }),
  plugins: getPlugins({ browser: false }),
};

const browserConfig = {
  input,
  output: { format: 'es', file: 'lib/index.browser.js' },
  external: getExternal({ browser: true }),
  plugins: getPlugins({ browser: true }),
};

const dtsConfig = {
  input: './lib/types/index.d.ts',
  output: [{ file: 'lib/index.d.ts', format: 'es' }],
  plugins: [dts(), del({ targets: 'lib/types', hook: 'buildEnd' })],
};

export default [serverConfig, browserConfig, dtsConfig];
