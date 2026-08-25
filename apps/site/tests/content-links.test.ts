import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from 'vitest';

const ROOT = path.join(import.meta.dirname, '../content/docs');

const walk = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return e.name.endsWith('.mdx') ? [p] : [];
  });

// mirrors github-slugger, which is what Fumadocs uses for heading ids
const slugify = (heading: string) =>
  heading
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N} \-_]/gu, '')
    .replace(/ /g, '-');

const headingSlugs = (body: string) => {
  const seen = new Map<string, number>();
  const slugs = new Set<string>();
  let fence = false;
  for (const line of body.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) fence = !fence;
    const m = fence ? null : line.match(/^#+\s+(.+?)\s*$/);
    if (!m) continue;
    const base = slugify(m[1]);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    slugs.add(n ? `${base}-${n}` : base);
  }
  return slugs;
};

const files = walk(ROOT);
const pages = new Map(
  files.map((file) => {
    const body = fs.readFileSync(file, 'utf8');
    const route = `/docs/${path
      .relative(ROOT, file)
      .replace(/\.mdx$/, '')
      .replace(/\/?index$/, '')}`;
    return [route.replace(/\/$/, ''), headingSlugs(body)] as const;
  }),
);

test('every internal docs link resolves to a page and heading', () => {
  expect(files.length).toBeGreaterThan(0);
  const broken: string[] = [];

  for (const file of files) {
    const body = fs.readFileSync(file, 'utf8');
    const route = `/docs/${path
      .relative(ROOT, file)
      .replace(/\.mdx$/, '')
      .replace(/\/?index$/, '')}`.replace(/\/$/, '');

    for (const [, target, anchor] of body.matchAll(
      /\]\((\/docs\/[^)#\s]*|)(#[^)\s]+)?\)/g,
    )) {
      if (!target && !anchor) continue;
      const page = target ? target.replace(/\/$/, '') : route;
      const slugs = pages.get(page);
      const where = `${path.relative(ROOT, file)}: ${target}${anchor ?? ''}`;
      if (!slugs) broken.push(`${where} (no such page)`);
      else if (anchor && !slugs.has(anchor.slice(1)))
        broken.push(`${where} (no such heading)`);
    }
  }

  expect(broken).toEqual([]);
});
