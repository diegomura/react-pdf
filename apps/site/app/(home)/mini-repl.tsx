'use client';

import { useState } from 'react';

import { Editor } from '@/src/repl/editor';
import { useRepl } from '@/src/repl/use-repl';
import { Viewer } from '@/src/repl/viewer';

import { SNIPPET } from './hero-snippet';

const EDITOR_CHROME = {
  highlightActiveLine: false,
  highlightActiveLineGutter: false,
  foldGutter: false,
};

function Status({
  rendering,
  failed,
}: {
  rendering: boolean;
  failed: boolean;
}) {
  const label = failed ? 'Preview off' : rendering ? 'Rendering' : 'Live';

  return (
    <span className="text-fd-muted-foreground flex items-center gap-1.5 text-[0.6875rem] tracking-wide">
      <span
        className={`size-1.5 rounded-full ${
          failed
            ? 'bg-fd-muted-foreground/50'
            : rendering
              ? 'bg-fd-primary animate-pulse'
              : 'bg-emerald-500'
        }`}
      />
      {label}
    </span>
  );
}

export function MiniRepl() {
  const [code, setCode] = useState(SNIPPET);
  const { url, error, rendering } = useRepl(code);

  const failed = Boolean(error) && !url;

  return (
    <div className="flex h-full flex-col">
      <div className="border-fd-border text-fd-muted-foreground flex h-9 shrink-0 items-center justify-between border-b px-3.5">
        <span className="font-mono text-[0.6875rem]">hello.jsx</span>
        <Status rendering={rendering} failed={failed} />
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-[14rem_1fr] md:grid-cols-[1.2fr_1fr] md:grid-rows-1">
        <div className="border-fd-border min-h-0 overflow-auto border-b md:border-e md:border-b-0">
          <Editor value={code} onChange={setCode} basicSetup={EDITOR_CHROME} />
        </div>

        <div className="bg-fd-muted relative flex min-h-0 justify-center">
          {failed ? (
            <p className="text-fd-muted-foreground max-w-[22rem] self-center px-6 text-center text-[0.8125rem] leading-relaxed">
              {error?.message}
            </p>
          ) : (
            <div className="aspect-[210/297] h-full">
              <Viewer url={url} rendering={rendering} />
            </div>
          )}

          {error && url && (
            <p className="text-fd-primary bg-fd-background/85 border-fd-primary/25 absolute inset-x-0 bottom-0 max-h-1/2 overflow-auto border-t px-3.5 py-2 font-mono text-[0.6875rem] leading-relaxed whitespace-pre-wrap backdrop-blur">
              {error.message}
              {error.line ? ` (line ${error.line})` : ''}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
