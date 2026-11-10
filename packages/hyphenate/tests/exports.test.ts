import { describe, expect, test } from 'vitest';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
);

describe('package exports', () => {
  test.each(Object.entries(pkg.exports))(
    'resolves %s for loaders that do not set the import condition',
    (_, conditions) => {
      expect(conditions).toHaveProperty('default');
      expect((conditions as Record<string, string>).default).toBe(
        (conditions as Record<string, string>).import,
      );
    },
  );
});
