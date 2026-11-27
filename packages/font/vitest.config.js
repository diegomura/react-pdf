import { defineConfig } from 'vitest/config';

export default defineConfig({
  define: { BROWSER: false },
  // font-store.test.ts mocks fontkit, which leaks across files when unisolated
  test: { poolOptions: { threads: { isolate: true } } },
});
