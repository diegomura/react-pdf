import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import ignore from 'rollup-plugin-ignore';

import pkg from './package.json';

const cjs = {
  exports: 'named',
  format: 'cjs'
};

const esm = {
  format: 'es'
};

const getCJS = override => Object.assign({}, cjs, override);
const getESM = override => Object.assign({}, esm, override);

const babelConfig = ({ browser }) => ({
  babelrc: false,
  exclude: 'node_modules/**',
  babelHelpers: 'runtime',
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
        ...(browser
          ? { targets: { browsers: 'last 2 versions' } }
          : { targets: { node: '12' } })
      }
    ]
  ],
  plugins: [['@babel/plugin-transform-runtime', { version: '^7.16.4' }]]
});

const configBase = {
  input: 'src/index.js',
  external: Object.keys(pkg.dependencies)
    .map(dep => (dep === 'crypto-js' ? 'crypto-js/md5' : dep))
    .concat(
      '@babel/runtime/helpers/inheritsLoose',
      '@babel/runtime/helpers/assertThisInitialized',
      '@babel/runtime/helpers/createForOfIteratorHelperLoose',
      '@babel/runtime/helpers/extends',
      'stream',
      'zlib'
    ),
  onwarn: (warning, rollupWarn) => {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      rollupWarn(warning);
    }
  }
};

const serverConfig = Object.assign({}, configBase, {
  output: [
    getESM({ file: 'lib/pdfkit.es.js' }),
    getCJS({ file: 'lib/pdfkit.cjs.js' })
  ],
  plugins: [
    json(),
    nodeResolve(),
    replace({
      preventAssignment: true,
      values: {
        BROWSER: JSON.stringify(false)
      }
    }),
    babel(babelConfig({ browser: false }))
  ],
  external: configBase.external.concat(['fs'])
});

const serverProdConfig = Object.assign({}, serverConfig, {
  output: [
    getESM({ file: 'lib/pdfkit.es.min.js' }),
    getCJS({ file: 'lib/pdfkit.cjs.min.js' })
  ],
  plugins: serverConfig.plugins.concat(terser())
});

const browserConfig = Object.assign({}, configBase, {
  output: [
    getESM({ file: 'lib/pdfkit.browser.es.js' }),
    getCJS({ file: 'lib/pdfkit.browser.cjs.js' })
  ],
  plugins: [
    ignore(['fs']),

    json(),
    nodeResolve(),

    replace({
      preventAssignment: true,
      values: {
        BROWSER: JSON.stringify(true)
      }
    }),
    babel(babelConfig({ browser: true }))
  ]
});

const browserProdConfig = Object.assign({}, browserConfig, {
  output: [
    getESM({ file: 'lib/pdfkit.browser.es.min.js' }),
    getCJS({ file: 'lib/pdfkit.browser.cjs.min.js' })
  ],
  plugins: browserConfig.plugins.concat(terser())
});

export default [
  serverConfig,
  serverProdConfig,
  browserConfig,
  browserProdConfig
];
