import { expect, test } from 'vitest';
import { GET as llms } from '@/app/llms.txt/route';
import { GET as raw } from '@/app/api/raw/[[...slug]]/route';

test('llms.txt links every page, and only v4 pages', async () => {
  const body = await llms().text();
  const urls = [...body.matchAll(/\]\((\/[^)]+)\)/g)].map((m) => m[1]);

  expect(urls.length).toBeGreaterThan(40);
  expect(urls.every((url) => url.startsWith('/docs/v4'))).toBe(true);
  expect(urls.every((url) => url.endsWith('.mdx'))).toBe(true);
  expect(urls).toContain('/docs/v4/components/text.mdx');
});

test('raw route serves page markdown without frontmatter', async () => {
  const response = await raw(new Request('http://localhost/api/raw'), {
    params: Promise.resolve({ slug: ['v4', 'components', 'text'] }),
  });

  expect(response.headers.get('Content-Type')).toContain('text/markdown');

  const body = await response.text();
  expect(body.startsWith('# ')).toBe(true);
  expect(body).toContain('URL: /docs/v4/components/text');
  expect(body).not.toContain('---\ntitle:');
});

test('raw route 404s on unknown pages', async () => {
  await expect(
    raw(new Request('http://localhost/api/raw'), {
      params: Promise.resolve({ slug: ['v4', 'nope'] }),
    }),
  ).rejects.toThrow();
});
