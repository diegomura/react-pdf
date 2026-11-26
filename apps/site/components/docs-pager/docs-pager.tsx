'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Check, ChevronLeft, ChevronRight, Copy } from 'lucide-react';
import { useState } from 'react';
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

const control =
  'text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:ring-fd-ring inline-flex h-7 items-center justify-center rounded-md border transition-colors outline-none focus-visible:ring-2';

const arrow = `${control} w-7`;

function CopyMarkdown() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    fetch(`${pathname}.mdx`)
      .then((response) => {
        // Without this an error page is copied to the clipboard as if it were
        // the document.
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      })
      .then((text) => navigator.clipboard.writeText(text))
      .then(
        () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        },
        () => {},
      );
  };

  return (
    <button
      type="button"
      onClick={copy}
      title="Copy this page as Markdown"
      aria-label="Copy this page as Markdown"
      className={`${control} gap-1.5 px-2 text-[0.8125rem]`}
    >
      {copied ? (
        <Check className="size-3.5 shrink-0 text-emerald-500" />
      ) : (
        <Copy className="size-3.5 shrink-0" />
      )}
      <span className="max-sm:hidden">
        {copied ? 'Copied' : 'Copy Markdown'}
      </span>
    </button>
  );
}

/**
 * Sticky content header: breadcrumb on the left, then the page actions —
 * copy-as-markdown next to the shadcn-style prev/next arrows.
 */
export function DocsHeader() {
  const { previous, next } = usePrevNext();

  return (
    <div className="mb-2 flex items-center gap-3">
      <PageBreadcrumb
        includeSeparator
        includePage
        className="min-w-0 flex-1 text-[0.8125rem]"
      />
      <div className="flex shrink-0 items-center gap-1.5">
        <CopyMarkdown />
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
