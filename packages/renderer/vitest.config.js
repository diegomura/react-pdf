// false positive on import/no-unresolved
// eslint-disable-next-line import/no-unresolved
import { defineConfig, defaultExclude } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Necessary to avoid "Module did not self-register" error with canvas.node
    pool: 'forks',
    setupFiles: ['vitest.setup.js'],
    include: ['tests/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [...defaultExclude, 'tests/{components,dom,usePDF}.test.*'],
    watch: false,
  },
});
