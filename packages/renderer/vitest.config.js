// false positive on import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import { defineConfig, defaultExclude } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias:
      process.env.REACT_VERSION && process.env.REACT_VERSION !== '18'
        ? [
            {
              find: 'react/jsx-dev-runtime',
              replacement: `react-${process.env.REACT_VERSION}/jsx-dev-runtime`,
            },
            {
              find: 'react',
              replacement: `react-${process.env.REACT_VERSION}`,
            },
            {
              find: 'react-dom',
              replacement: `react-dom-${process.env.REACT_VERSION}`,
            },
          ]
        : undefined,
  },
  test: {
    // Necessary to avoid "Module did not self-register" error with canvas.node
    pool: 'forks',
    setupFiles: ['vitest.setup.js'],
    include: ['tests/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [...defaultExclude, 'tests/{components,dom,usePDF}.test.*'],
    watch: false,
  },
});
