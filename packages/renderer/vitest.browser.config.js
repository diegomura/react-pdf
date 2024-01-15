// false positive on import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    conditions: ['browser'],
    mainFields: ['browser'],
  },
  plugins: [react()],
  test: {
    environment: './tests/environment/jsdom.js',
    setupFiles: ['vitest.setup.js'],
    include: ['tests/{components,dom,usePDF}.test.*'],
    watch: false,
  },
});
