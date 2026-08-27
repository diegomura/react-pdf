import Link from 'next/link';

import { examples } from '@/lib/examples';

import { ExampleBlock } from './example-block';

const playgroundHref = (name?: string) =>
  name ? `/playground?example=${encodeURIComponent(name)}` : '/playground';

export interface ExampleProps {
  name?: string;
  defaultOpen?: boolean;
}

/**
 * Runs on the server: only the one example's source is baked into the page, so
 * the docs bundle never carries the 42-entry registry. The preview and its
 * editor cost the reader anything only once the block scrolls into view.
 */
export function Example({ name, defaultOpen }: ExampleProps) {
  const code = name ? examples[name] : undefined;
  const href = playgroundHref(name);

  // v1/v2 have a handful of nameless usages; there is nothing to preview
  if (!code)
    return (
      <div className="my-6 flex justify-end">
        <Link
          href={href}
          className="text-fd-muted-foreground hover:text-fd-foreground text-[0.8125rem] transition-colors"
        >
          Open in Playground ↗
        </Link>
      </div>
    );

  return <ExampleBlock code={code} href={href} defaultOpen={defaultOpen} />;
}
