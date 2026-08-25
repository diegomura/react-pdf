import { describe, expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { parseChangelog } from '../lib/changelog';

const markdown = readFileSync(
  path.join(process.cwd(), '../../packages/renderer/CHANGELOG.md'),
  'utf8',
);

describe('parseChangelog', () => {
  test('reads versions newest first', () => {
    const releases = parseChangelog(markdown);
    expect(releases.length).toBeGreaterThan(50);
    expect(releases[0].version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(releases.at(-1)?.version).toBe('2.1.0');
  });

  test('classifies major, minor and patch releases', () => {
    const kind = (version: string) =>
      parseChangelog(markdown).find((r) => r.version === version)?.kind;

    expect(kind('4.0.0')).toBe('major');
    expect(kind('4.7.0')).toBe('minor');
    expect(kind('4.8.1')).toBe('patch');
  });

  test('drops "Updated dependencies" noise', () => {
    const summaries = parseChangelog(markdown).flatMap((r) =>
      r.changes.map((c) => c.summary),
    );

    expect(summaries.length).toBeGreaterThan(0);
    expect(summaries.some((s) => s.startsWith('Updated dependencies'))).toBe(
      false,
    );
  });

  test('extracts pr, commit and author from an entry', () => {
    const release = parseChangelog(markdown).find((r) => r.version === '4.8.0');
    const change = release?.changes[0];

    expect(change).toMatchObject({
      summary:
        'Replace the @react-pdf/pdfkit fork with upstream pdfkit (v0.20.1)',
      pr: '3509',
      author: 'diegomura',
    });
    expect(change?.prUrl).toBe(
      'https://github.com/diegomura/react-pdf/pull/3509',
    );
    expect(change?.commitUrl).toContain('/commit/');
  });

  test('keeps entries that have no pr link', () => {
    const change = parseChangelog(markdown)
      .find((r) => r.version === '4.1.0')
      ?.changes.find((c) => !c.pr);

    expect(change?.author).toBeDefined();
    expect(change?.summary).not.toContain('](');
  });

  test('takes only the first paragraph of a multi-paragraph entry', () => {
    const change = parseChangelog(markdown)
      .find((r) => r.version === '4.7.0')
      ?.changes.find((c) => c.pr === '3505');

    expect(change?.summary).toBe(
      'Experimental pagination engine, opt-in per page',
    );
  });

  test('strips conventional-commit prefixes and capitalizes', () => {
    const summaries = parseChangelog(markdown).flatMap((r) =>
      r.changes.map((c) => c.summary),
    );

    expect(summaries).toContain('Add React 19 support');
    expect(summaries).toContain('Drop cjs support');
    expect(summaries).toContain('Fix debug prop');
    expect(
      summaries.some((s) => /^(feat|fix|refactor|chore)[(:]/.test(s)),
    ).toBe(false);
  });

  test('unescapes markdown escapes in summaries', () => {
    const summaries = parseChangelog(markdown).flatMap((r) =>
      r.changes.map((c) => c.summary),
    );

    expect(summaries.some((s) => s.includes('\\'))).toBe(false);
  });
});
