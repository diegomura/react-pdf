import { dts } from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import typescript from '@rollup/plugin-typescript';

import replace from '@rollup/plugin-replace';

import pkg from './package.json' with { type: 'json' };

const input = './src/index.ts';

const external = [
  ...Object.keys(pkg.dependencies),
  /^pdfkit\/standard-fonts\//,
];

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
  // pdfkit's node build registers the standard fonts itself, so drop the
  // side-effect-only imports rollup would otherwise keep for externals
  treeshake: {
    moduleSideEffects: (id) => !id.startsWith('pdfkit/standard-fonts/'),
  },
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
