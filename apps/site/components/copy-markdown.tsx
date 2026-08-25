'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export function CopyMarkdown({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    fetch(`${url}.mdx`)
      .then((response) => response.text())
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
      aria-label="Copy this page as Markdown"
      className="border-fd-border text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground focus-visible:ring-fd-ring inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md border px-2 text-[13px] transition-colors outline-none focus-visible:ring-2"
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-500" />
      ) : (
        <Copy className="size-3.5" />
      )}
      {copied ? 'Copied' : 'Copy Markdown'}
    </button>
  );
}
