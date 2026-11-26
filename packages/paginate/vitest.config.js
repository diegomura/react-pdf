import path from 'path';
import url from 'url';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    pool: 'forks',
    setupFiles: [path.resolve(__dirname, 'vitest.setup.js')],
    include: ['tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    watch: false,
  },
});
