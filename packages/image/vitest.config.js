import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['vitest.setup.js'],
    include: ['tests/*.{test,spec}.?(c|m)[jt]s?(x)'],
    watch: false,
  },
});
