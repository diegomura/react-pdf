import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { expect, test } from 'vitest';

const require = createRequire(import.meta.url);

test('resolves package exports through require conditions', () => {
  expect(require.resolve('@react-pdf/hyphenate')).toBe(
    fileURLToPath(new URL('../lib/index.js', import.meta.url)),
  );
  expect(require.resolve('@react-pdf/hyphenate/en-us')).toBe(
    fileURLToPath(new URL('../lib/en-us.js', import.meta.url)),
  );
});
