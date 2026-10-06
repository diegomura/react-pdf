export const CHANGELOG_URL =
  'https://github.com/diegomura/react-pdf/blob/master/packages/renderer/CHANGELOG.md';

/** Fetched rather than read off disk: Vercel builds this app from apps/site alone. */
const CHANGELOG_RAW_URL =
  'https://raw.githubusercontent.com/diegomura/react-pdf/master/packages/renderer/CHANGELOG.md';

/** Releases shown on the page; older ones live in the full changelog on GitHub. */
export const RELEASE_LIMIT = 30;

export type ReleaseKind = 'major' | 'minor' | 'patch';

export type Change = {
  summary: string;
  pr?: string;
  prUrl?: string;
  commitUrl?: string;
  author?: string;
};

export type Release = {
  version: string;
  kind: ReleaseKind;
  date?: string;
  changes: Change[];
};

const ENTRY_META =
  /^(?:\[#(\d+)\]\((\S+?)\)\s*)?(?:\[`[0-9a-f]+`\]\((\S+?)\)\s*)?(?:Thanks \[@([^\]]+)\]\(\S+?\)!)?\s*-?\s*/;

const releaseKind = (version: string): ReleaseKind => {
  const [, minor, patch] = version.split('.').map(Number);
  if (minor === 0 && patch === 0) return 'major';
  return patch === 0 ? 'minor' : 'patch';
};

/** Conventional-commit prefixes read as noise once the release already carries a type badge. */
const COMMIT_PREFIX =
  /^(feat|fix|refactor|perf|chore|docs|build|test)(\([^)]*\))?!?:\s*/i;

const parseChange = (raw: string): Change => {
  const [, pr, prUrl, commitUrl, author] = raw.match(ENTRY_META) ?? [];
  const line = raw
    .replace(ENTRY_META, '')
    .split(/\n\s*\n/)[0]
    .replace(/\\(.)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

  const type = line.match(COMMIT_PREFIX)?.[1]?.toLowerCase();
  const body = line.replace(COMMIT_PREFIX, '');
  const summary =
    type === 'fix'
      ? `Fix ${body}`
      : body.charAt(0).toUpperCase() + body.slice(1);

  return { summary, pr, prUrl, commitUrl, author };
};

export function parseChangelog(markdown: string): Release[] {
  return markdown
    .split(/^## /m)
    .slice(1)
    .map((block) => {
      const [head, ...sections] = block.split(/^### /m);
      const version = head.trim();
      const changes = sections
        .flatMap((section) => section.split(/^[-*] /m).slice(1))
        .filter((entry) => !entry.startsWith('Updated dependencies'))
        .map(parseChange)
        .filter((change) => change.summary.length > 0);

      return { version, kind: releaseKind(version), changes };
    })
    .filter((release) => /^\d+\.\d+\.\d+$/.test(release.version));
}

/** npm publish times: the changesets changelog carries no dates, and git tags aren't in a Vercel checkout. */
async function fetchReleaseDates(): Promise<Record<string, string>> {
  try {
    const res = await fetch('https://registry.npmjs.org/@react-pdf/renderer', {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return {};
    return (await res.json())?.time ?? {};
  } catch {
    return {};
  }
}

export async function getReleases(): Promise<Release[]> {
  const res = await fetch(CHANGELOG_RAW_URL, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`Changelog fetch failed: ${res.status}`);
  const markdown = await res.text();
  const dates = await fetchReleaseDates();

  return parseChangelog(markdown)
    .slice(0, RELEASE_LIMIT)
    .map((release) => ({ ...release, date: dates[release.version] }));
}
