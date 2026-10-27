'use client';

import dynamic from 'next/dynamic';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

const INSTALL_COMMAND = 'npm install @react-pdf/renderer';

export function CopyCommand() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(INSTALL_COMMAND).then(
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
      aria-label={`Copy "${INSTALL_COMMAND}" to clipboard`}
      className="border-fd-border bg-fd-muted/50 hover:bg-fd-accent focus-visible:ring-fd-ring focus-visible:ring-offset-fd-background group inline-flex h-9 items-center gap-2.5 rounded-md border ps-3 pe-2.5 font-mono text-[0.8125rem] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <span className="text-fd-muted-foreground/70 select-none">$</span>
      <span className="truncate">{INSTALL_COMMAND}</span>
      {copied ? (
        <Check className="size-3.5 shrink-0 text-emerald-500" />
      ) : (
        <Copy className="text-fd-muted-foreground group-hover:text-fd-foreground size-3.5 shrink-0 transition-colors" />
      )}
    </button>
  );
}

/** Mirrors MiniPlayground's grid exactly so the swap costs no layout shift. */
function Skeleton() {
  const widths = ['62%', '84%', '48%', '73%', '38%', '80%'];

  return (
    <div className="grid h-full animate-pulse grid-rows-[12rem_1fr] md:grid-cols-[1.2fr_1fr] md:grid-rows-1">
      <div className="border-fd-border flex min-h-0 flex-col border-b md:border-e md:border-b-0">
        <div className="border-fd-border h-9 shrink-0 border-b" />
        <div className="flex flex-col gap-2.5 p-4">
          {widths.map((width, i) => (
            <div
              key={i}
              className="bg-fd-muted-foreground/12 h-2 rounded-full"
              style={{ width }}
            />
          ))}
        </div>
      </div>
      <div className="bg-fd-muted flex min-h-0 flex-col">
        <div className="border-fd-border h-9 shrink-0 border-b" />
        {/* same box the viewer fits its page into, so the page does not move in */}
        <div className="flex min-h-0 flex-1 justify-center p-2.5 md:p-4">
          <div className="aspect-[1/1.4142] h-full rounded-[2px] bg-white" />
        </div>
      </div>
    </div>
  );
}

export const HeroPlayground = dynamic(
  () => import('./mini-playground').then((m) => m.MiniPlayground),
  {
    ssr: false,
    loading: () => <Skeleton />,
  },
);
