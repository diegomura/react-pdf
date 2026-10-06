import Link from 'next/link';
import { splits, type SplitGroup } from './v4-splits';
import { HashRedirect } from './hash-redirect';

export interface SectionIndexProps {
  group: SplitGroup;
}

export function SectionIndex({ group }: SectionIndexProps) {
  const { pages, hashes } = splits[group];

  return (
    <>
      <HashRedirect hashes={hashes} />
      <div className="not-prose mt-8 grid gap-2 sm:grid-cols-2">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/docs/v4/${group}/${page.slug}`}
            className="rounded-lg border px-4 py-3 text-sm font-medium transition-colors hover:bg-fd-accent/80 hover:text-fd-accent-foreground"
          >
            {page.title}
          </Link>
        ))}
      </div>
    </>
  );
}
