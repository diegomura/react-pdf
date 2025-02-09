import typescript from '@rollup/plugin-typescript';

const config = {
  input: 'src/index.ts',
  output: {
    dir: 'lib',
    format: 'es',
  },
  plugins: [typescript()],
};

export default config;
