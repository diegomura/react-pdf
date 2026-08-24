import { describe, it, expect } from 'vitest';
import config from '../next.config.mjs';

const LEGACY = [
  'advanced',
  'compatibility',
  'components',
  'fonts',
  'form',
  'hooks',
  'node',
  'rendering-process',
  'styling',
  'svg',
];

describe('legacy redirects', () => {
  it('maps every legacy top-level docs URL to /docs/v4', async () => {
    const redirects = await config.redirects!();
    for (const slug of LEGACY) {
      const r = redirects.find(
        (x: { source: string }) => x.source === `/${slug}`,
      );
      expect(r, `missing redirect for /${slug}`).toBeDefined();
      expect(r!.destination).toBe(`/docs/v4/${slug}`);
      expect(r!.permanent).toBe(true);
    }
  });

  it('leaves /repl untouched', async () => {
    const redirects = await config.redirects!();
    expect(
      redirects.find((x: { source: string }) => x.source === '/repl'),
    ).toBeUndefined();
  });

  it('every redirect destination is a real content page', async () => {
    const fs = await import('node:fs');
    const redirects = await config.redirects!();
    for (const r of redirects) {
      if (!r.destination.startsWith('/docs/v4/')) continue;
      const slug = r.destination.replace('/docs/v4/', '');
      expect(
        fs.existsSync(`content/docs/v4/${slug}.mdx`),
        `${r.destination} has no content file`,
      ).toBe(true);
    }
  });
});
