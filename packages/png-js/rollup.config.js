import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import ignore from 'rollup-plugin-ignore';
import { terser } from 'rollup-plugin-terser';

const cjs = {
  exports: 'named',
  format: 'cjs',
};

const esm = {
  format: 'es',
};

const getCJS = override => Object.assign({}, cjs, override);
const getESM = override => Object.assign({}, esm, override);

const configBase = {
  input: 'src/index.js',
  external: ['zlib'],
  plugins: [
    babel({
      babelrc: false,
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          {
            loose: true,
            modules: false,
            targets: { node: '12', browsers: 'last 2 versions' },
          },
        ],
      ],
      plugins: [['@babel/plugin-transform-runtime', { version: '^7.16.4' }]],
    }),
  ],
};

const serverConfig = Object.assign({}, configBase, {
  output: [
    getESM({ file: 'lib/png-js.es.js' }),
    getCJS({ file: 'lib/png-js.cjs.js' }),
  ],
  plugins: configBase.plugins.concat(
    replace({
      preventAssignment: true,
      values: {
        BROWSER: JSON.stringify(false),
      },
    }),
  ),
  external: ['fs'],
});

const serverProdConfig = Object.assign({}, serverConfig, {
  output: [
    getESM({ file: 'lib/png-js.es.min.js' }),
    getCJS({ file: 'lib/png-js.cjs.min.js' }),
  ],
  plugins: serverConfig.plugins.concat(terser()),
});

const browserConfig = Object.assign({}, configBase, {
  output: [
    getESM({ file: 'lib/png-js.browser.es.js' }),
    getCJS({ file: 'lib/png-js.browser.cjs.js' }),
  ],
  plugins: configBase.plugins.concat(
    replace({
      preventAssignment: true,
      values: {
        BROWSER: JSON.stringify(true),
        'png-js': 'png-js/png.js',
      },
    }),
    ignore(['fs']),
  ),
});

const browserProdConfig = Object.assign({}, browserConfig, {
  output: [
    getESM({ file: 'lib/png-js.browser.es.min.js' }),
    getCJS({ file: 'lib/png-js.browser.cjs.min.js' }),
  ],
  plugins: browserConfig.plugins.concat(terser()),
});

export default [
  serverConfig,
  serverProdConfig,
  browserConfig,
  browserProdConfig,
];
