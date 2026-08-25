import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from 'vitest';
import { splits } from '../lib/v4-splits';

const V4 = path.join(import.meta.dirname, '../content/docs/v4');

const groups = Object.keys(splits) as (keyof typeof splits)[];

test('every split group keeps an index page', () => {
  expect(groups).toEqual(['components', 'svg', 'form', 'advanced']);
  for (const group of groups) {
    const index = path.join(V4, group, 'index.mdx');
    expect(fs.existsSync(index), `${group}/index.mdx missing`).toBe(true);
    expect(fs.readFileSync(index, 'utf8')).toContain(
      `<SectionIndex group="${group}" />`,
    );
  }
});

test('every listed page exists and is reachable from the sidebar', () => {
  const meta = JSON.parse(
    fs.readFileSync(path.join(V4, 'meta.json'), 'utf8'),
  ) as { pages: string[] };

  for (const group of groups) {
    for (const { slug } of splits[group].pages) {
      const file = path.join(V4, group, `${slug}.mdx`);
      expect(fs.existsSync(file), `${group}/${slug}.mdx missing`).toBe(true);
      expect(meta.pages, `${group}/${slug} missing from meta.json`).toContain(
        `${group}/${slug}`,
      );
    }
  }
});

test('every legacy hash resolves to an existing page and heading', () => {
  for (const group of groups) {
    for (const [hash, target] of Object.entries(splits[group].hashes)) {
      const [route, anchor] = target.split('#');
      const file = path.join(V4, `${route}.mdx`);
      expect(fs.existsSync(file), `#${hash} -> ${target} has no page`).toBe(
        true,
      );
      if (!anchor) continue;
      const body = fs.readFileSync(file, 'utf8');
      const found = body
        .split('\n')
        .some((line) => /^#{2,6} /.test(line) && slugify(line) === anchor);
      expect(found, `#${hash} -> ${target} has no such heading`).toBe(true);
    }
  }
});

// mirrors github-slugger, which is what Fumadocs uses for heading ids
const slugify = (heading: string) =>
  heading
    .replace(/^#+\s+/, '')
    .replace(/[`*_]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N} \-_]/gu, '')
    .replace(/ /g, '-');
