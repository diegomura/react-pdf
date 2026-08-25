'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useFooterItems } from 'fumadocs-ui/utils/use-footer-items';
import { PageBreadcrumb } from 'fumadocs-ui/layouts/notebook/page';

function usePrevNext() {
  const items = useFooterItems();
  const pathname = usePathname();
  const index = items.findIndex((item) => item.url === pathname);

  return {
    previous: index > 0 ? items[index - 1] : undefined,
    next: index === -1 ? undefined : items[index + 1],
  };
}

const arrow =
  'text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground inline-flex size-7 items-center justify-center rounded-md border transition-colors';

/**
 * Sticky content header: breadcrumb on the left, shadcn-style prev/next arrows
 * on the right. Sticks under the navbar so the current page stays visible.
 */
export function DocsHeader() {
  const { previous, next } = usePrevNext();
  if (!previous && !next) return null;

  return (
    <div className="sticky top-(--fd-docs-row-2) z-10 -mt-2 -mb-2 flex items-center gap-3 bg-linear-to-b from-(--color-fd-background) from-80% to-transparent pt-2 pb-4">
      <PageBreadcrumb
        includeSeparator
        includePage
        className="min-w-0 flex-1 text-[0.8125rem]"
      />
      <div className="flex shrink-0 items-center gap-1.5">
        {previous ? (
          <Link
            href={previous.url}
            aria-label="Previous page"
            className={arrow}
          >
            <ChevronLeft className="size-4" />
          </Link>
        ) : (
          <span className={`${arrow} opacity-40`} aria-hidden>
            <ChevronLeft className="size-4" />
          </span>
        )}
        {next ? (
          <Link href={next.url} aria-label="Next page" className={arrow}>
            <ChevronRight className="size-4" />
          </Link>
        ) : (
          <span className={`${arrow} opacity-40`} aria-hidden>
            <ChevronRight className="size-4" />
          </span>
        )}
      </div>
    </div>
  );
}

export function DocsFooter() {
  const { previous, next } = usePrevNext();

  return (
    <div className="mt-4 flex items-center justify-between gap-4 border-t pt-4 text-sm">
      {previous ? (
        <Link
          href={previous.url}
          className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
        >
          ← {previous.name}
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={next.url}
          className="text-fd-muted-foreground hover:text-fd-foreground ms-auto transition-colors"
        >
          {next.name} →
        </Link>
      )}
    </div>
  );
}
