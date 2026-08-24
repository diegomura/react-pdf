import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: { '@': path.join(import.meta.dirname, '.') },
  },
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
