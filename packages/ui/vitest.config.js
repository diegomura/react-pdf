import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Deliberately no REACT_VERSION aliasing: packages/renderer opts into the
// matrix, this package always runs against the root React install so the suite
// needs one set of testing-library shims instead of four.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['tests/*.{test,spec}.?(c|m)[jt]s?(x)'],
    watch: false,
  },
});
