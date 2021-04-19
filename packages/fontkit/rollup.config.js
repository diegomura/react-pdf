import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
import ignore from 'rollup-plugin-ignore';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import localResolve from 'rollup-plugin-local-resolve';
import pkg from './package.json';

const cjs = {
  exports: 'named',
  format: 'cjs',
};

const es = {
  format: 'es',
};

const getCJS = override => Object.assign({}, cjs, override);
const getESM = override => Object.assign({}, es, override);

const babelConfig = ({ browser }) => ({
  babelrc: false,
  exclude: 'node_modules/**',
  runtimeHelpers: true,
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        ...(browser
          ? { targets: { browsers: 'last 2 versions' } }
          : { targets: { node: '12' } }),
      },
    ],
  ],
});

const configBase = {
  input: 'src/index.js',
  plugins: [localResolve(), json()],
  external: ['restructure/src/utils'].concat(Object.keys(pkg.dependencies)),
};

const serverConfig = Object.assign({}, configBase, {
  output: [
    getESM({ file: 'lib/fontkit.es.js' }),
    getCJS({ file: 'lib/fontkit.cjs.js' }),
  ],
  plugins: configBase.plugins.concat(
    babel(babelConfig({ browser: false })),
    replace({
      BROWSER: JSON.stringify(false),
    }),
  ),
  external: configBase.external.concat(['fs', 'brotli/decompress']),
});

const serverProdConfig = Object.assign({}, serverConfig, {
  output: [
    getESM({ file: 'lib/fontkit.es.min.js' }),
    getCJS({ file: 'lib/fontkit.cjs.min.js' }),
  ],
  plugins: serverConfig.plugins.concat(terser()),
});

const browserConfig = Object.assign({}, configBase, {
  output: [
    getESM({ file: 'lib/fontkit.browser.es.js' }),
    getCJS({ file: 'lib/fontkit.browser.cjs.js' }),
  ],
  plugins: configBase.plugins.concat(
    babel(babelConfig({ browser: true })),
    replace({
      BROWSER: JSON.stringify(true),
    }),
    ignore(['fs', 'brotli', 'brotli/decompress', './WOFF2Font']),
  ),
});

const browserProdConfig = Object.assign({}, browserConfig, {
  output: [
    getESM({ file: 'lib/fontkit.browser.es.min.js' }),
    getCJS({ file: 'lib/fontkit.browser.cjs.min.js' }),
  ],
  plugins: browserConfig.plugins.concat(terser()),
});

export default [
  serverConfig,
  serverProdConfig,
  browserConfig,
  browserProdConfig,
];
