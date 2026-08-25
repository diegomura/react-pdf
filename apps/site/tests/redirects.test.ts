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

  it('sends the old /repl route to /playground with the shared query intact', async () => {
    const fs = await import('node:fs');
    const redirects = await config.redirects!();
    const r = redirects.find((x: { source: string }) => x.source === '/repl');
    expect(r, 'missing redirect for /repl').toBeDefined();
    expect(r!.destination).toBe('/playground');
    expect(r!.permanent).toBe(true);
    // Next forwards the incoming query only when the destination has none, and
    // thousands of shared links are /repl?code=…
    expect(r!.destination).not.toContain('?');
    expect(
      fs.existsSync('app/repl'),
      'a real /repl route would shadow the redirect',
    ).toBe(false);
  });

  it('every redirect destination is a real content page', async () => {
    const fs = await import('node:fs');
    const redirects = await config.redirects!();
    for (const r of redirects) {
      if (!r.destination.startsWith('/docs/v4/')) continue;
      const slug = r.destination.replace('/docs/v4/', '');
      expect(
        fs.existsSync(`content/docs/v4/${slug}.mdx`) ||
          fs.existsSync(`content/docs/v4/${slug}/index.mdx`),
        `${r.destination} has no content file`,
      ).toBe(true);
    }
  });
});
