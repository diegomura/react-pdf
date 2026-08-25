import path from 'node:path';
import mdx from 'fumadocs-mdx/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: mdx(undefined, { index: false }),
  resolve: {
    alias: { '@': path.join(import.meta.dirname, '.') },
  },
  test: {
    include: ['tests/**/*.test.ts'],
  },
});
