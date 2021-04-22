import json from 'rollup-plugin-json';
import babel from 'rollup-plugin-babel';
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
  input: 'index.js',
  plugins: [
    json(),
    babel({
      babelrc: false,
      runtimeHelpers: true,
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
    }),
  ],
};

const config = Object.assign({}, configBase, {
  output: [
    getESM({ file: 'lib/unicode-properties.es.js' }),
    getCJS({ file: 'lib/unicode-properties.cjs.js' }),
  ],
});

const prodConfig = Object.assign({}, configBase, {
  output: [
    getESM({ file: 'lib/unicode-properties.es.min.js' }),
    getCJS({ file: 'lib/unicode-properties.cjs.min.js' }),
  ],
  plugins: configBase.plugins.concat(terser()),
});

export default [config, prodConfig];
