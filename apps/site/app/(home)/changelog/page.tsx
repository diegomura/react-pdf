import Link from 'next/link';
import {
  CHANGELOG_URL,
  getReleases,
  type Release,
  type ReleaseKind,
} from '@/lib/changelog';

export const metadata = {
  title: 'Changelog',
  description: 'Releases of @react-pdf/renderer.',
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

const BADGE: Record<ReleaseKind, string> = {
  major: 'border-fd-primary/30 bg-fd-primary/10 text-fd-primary',
  minor: 'border-fd-border text-fd-muted-foreground',
  patch: '',
};

function Summary({ text }: { text: string }) {
  return (
    <>
      {text.split('`').map((part, i) =>
        i % 2 ? (
          <code
            key={i}
            className="bg-fd-muted rounded border px-1 py-px font-mono text-[0.8125em]"
          >
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

function VersionRail({ release }: { release: Release }) {
  return (
    <div className="mb-3 flex items-center gap-2 md:sticky md:top-24 md:mb-0 md:block md:self-start">
      <a
        href={`#${release.version}`}
        id={release.version}
        className="hover:text-fd-primary scroll-mt-24 font-mono text-[0.9375rem] font-medium tracking-tight transition-colors"
      >
        {release.version}
      </a>
      {release.kind !== 'patch' && (
        <span
          className={`rounded border px-1.5 py-px text-[0.625rem] font-medium tracking-wide uppercase md:ms-2 ${BADGE[release.kind]}`}
        >
          {release.kind}
        </span>
      )}
      {release.date && (
        <time
          dateTime={release.date}
          className="text-fd-muted-foreground text-[0.75rem] max-md:before:mx-1.5 max-md:before:content-['·'] md:mt-1 md:block"
        >
          {formatDate(release.date)}
        </time>
      )}
    </div>
  );
}

function ReleaseRow({ release }: { release: Release }) {
  return (
    <section className="border-fd-border grid border-t py-7 md:grid-cols-[9.5rem_1fr] md:gap-x-8">
      <VersionRail release={release} />
      <ul className="space-y-2.5">
        {release.changes.map((change, i) => (
          <li
            key={i}
            className="grid grid-cols-[0.75rem_1fr] items-baseline text-[0.9375rem] leading-relaxed"
          >
            <span
              aria-hidden
              className="bg-fd-border size-[3px] translate-y-[-0.3em] rounded-full"
            />
            <p>
              <Summary text={change.summary} />
              {change.prUrl && (
                <a
                  href={change.prUrl}
                  className="text-fd-muted-foreground hover:text-fd-primary ms-1.5 font-mono text-[0.75rem] transition-colors"
                >
                  #{change.pr}
                </a>
              )}
              {change.author && (
                <span className="text-fd-muted-foreground ms-1.5 text-[0.75rem]">
                  by{' '}
                  <a
                    href={`https://github.com/${change.author}`}
                    className="hover:text-fd-foreground transition-colors"
                  >
                    @{change.author}
                  </a>
                </span>
              )}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MaintenanceRow({ versions }: { versions: string[] }) {
  return (
    <section className="border-fd-border text-fd-muted-foreground grid border-t py-4 text-[0.8125rem] md:grid-cols-[9.5rem_1fr] md:gap-x-8">
      <span className="font-mono">{versions.join(', ')}</span>
      <span className="max-md:mt-0.5">Dependency updates</span>
    </section>
  );
}

type Row = { release: Release } | { maintenance: string[] };

/** Consecutive dependency-only releases collapse into one line so real changes keep the page's rhythm. */
function toRows(releases: Release[]): Row[] {
  return releases.reduce<Row[]>((rows, release) => {
    if (release.changes.length > 0) return [...rows, { release }];

    const last = rows.at(-1);
    if (last && 'maintenance' in last) last.maintenance.push(release.version);
    else rows.push({ maintenance: [release.version] });

    return rows;
  }, []);
}

export default async function ChangelogPage() {
  const rows = toRows(await getReleases());

  return (
    <main className="mx-auto w-full max-w-[52rem] flex-1 px-4 py-16">
      <header className="mb-10">
        <h1 className="text-[1.75rem] font-semibold tracking-[-0.02em]">
          Changelog
        </h1>
        <p className="text-fd-muted-foreground mt-2 text-[0.9375rem]">
          New features, fixes and improvements shipped in{' '}
          <code className="font-mono">@react-pdf/renderer</code>.
        </p>
      </header>

      {rows.map((row, i) =>
        'release' in row ? (
          <ReleaseRow key={row.release.version} release={row.release} />
        ) : (
          <MaintenanceRow key={i} versions={row.maintenance} />
        ),
      )}

      <footer className="border-fd-border text-fd-muted-foreground border-t pt-7 text-[0.8125rem]">
        Looking for older releases?{' '}
        <a
          href={CHANGELOG_URL}
          className="text-fd-foreground hover:text-fd-primary underline underline-offset-4 transition-colors"
        >
          Read the full changelog on GitHub
        </a>
        .
      </footer>
    </main>
  );
}
