import { defineConfig } from 'vitest/config';
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
    conditions: ['browser'],
    mainFields: ['browser'],
  },
  test: {
    environment: './tests/environment/jsdom.js',
    setupFiles: ['vitest.setup.js'],
    include: ['tests/{components,dom,usePDF}.test.*'],
    watch: false,
  },
});
