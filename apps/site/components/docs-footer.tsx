'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFooterItems } from 'fumadocs-ui/utils/use-footer-items';

export function DocsFooter() {
  const items = useFooterItems();
  const pathname = usePathname();
  const index = items.findIndex((item) => item.url === pathname);
  const previous = index > 0 ? items[index - 1] : undefined;
  const next = index === -1 ? undefined : items[index + 1];

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
