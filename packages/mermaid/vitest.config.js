import path from 'path';
import url from 'url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@react-pdf/mermaid',
        replacement: path.resolve(__dirname, 'src/index.ts'),
      },
    ],
  },
  test: {
    pool: 'forks',
    setupFiles: ['vitest.polyfills.js', 'vitest.setup.js'],
    include: ['tests/*.{test,spec}.?(c|m)[jt]s?(x)'],
    watch: false,
  },
});
