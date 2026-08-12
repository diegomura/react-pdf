import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import ignore from 'rollup-plugin-ignore';
import alias from '@rollup/plugin-alias';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json' with { type: 'json' };

const STANDARD_FONTS = [
  'Courier',
  'CourierBold',
  'CourierBoldOblique',
  'CourierOblique',
  'Helvetica',
  'HelveticaBold',
  'HelveticaBoldOblique',
  'HelveticaOblique',
  'Symbol',
  'TimesBold',
  'TimesBoldItalic',
  'TimesItalic',
  'TimesRoman',
  'ZapfDingbats'
];

const babelConfig = () => ({
  babelrc: true,
  exclude: 'node_modules/**',
  babelHelpers: 'runtime'
});

const getExternal = ({ browser }) => [
  ...Object.keys(pkg.dependencies).filter(
    (dep) => !browser || dep !== 'vite-compatible-readable-stream'
  ),
  /@babel\/runtime/,
  'js-md5',
  '@noble/hashes/sha256',
  '@noble/ciphers/aes',
  ...(browser ? [] : ['fs'])
];

const getPlugins = ({ browser }) => [
  ...(browser
    ? [
        ignore(['fs']),
        alias({
          entries: [
            { find: 'stream', replacement: 'vite-compatible-readable-stream' }
          ]
        }),
        commonjs(),
        nodeResolve({ browser, preferBuiltins: !browser }),
        nodePolyfills({
          include: [/node_modules\/.+\.js/, /pdfkit\/src\/.*\.js/]
        })
      ]
    : [nodeResolve({ browser, preferBuiltins: !browser })]),
  replace({
    preventAssignment: true,
    values: {
      BROWSER: JSON.stringify(browser)
    }
  }),
  babel(babelConfig()),
];

const serverConfig = {
  input: 'src/document.node.js',
  output: { format: 'es', file: 'lib/pdfkit.js' },
  external: getExternal({ browser: false }),
  plugins: getPlugins({ browser: false }),
  treeshake: { moduleSideEffects: 'no-external' }
};

const browserConfig = {
  input: 'src/document.browser.js',
  output: { format: 'es', file: 'lib/pdfkit.browser.js' },
  external: getExternal({ browser: true }),
  plugins: getPlugins({ browser: true })
};

// Kept out of the bundles so browser consumers only pay for the fonts they register
const standardFontsConfig = {
  input: Object.fromEntries(
    STANDARD_FONTS.map((name) => [name, `src/font/generated/${name}.js`])
  ),
  output: { format: 'es', dir: 'lib/standard-fonts' },
  plugins: [babel(babelConfig())]
};

export default [
  serverConfig,
  browserConfig,
  standardFontsConfig,
];
