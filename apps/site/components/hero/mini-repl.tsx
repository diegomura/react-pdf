'use client';

import { ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';

import { compress } from '@/components/repl/compress';
import { Editor } from '@/components/repl/editor';
import { useRepl } from '@/components/repl/use-repl';
import { Viewer } from '@/components/repl/viewer';

import { HERO_FILES } from './hero-files';

const EDITOR_CHROME = {
  highlightActiveLine: false,
  highlightActiveLineGutter: false,
  foldGutter: false,
  lineNumbers: false,
};

const stripClass =
  'border-fd-border text-fd-muted-foreground flex h-9 shrink-0 items-center border-b';

export function MiniRepl() {
  const [sources, setSources] = useState(() => HERO_FILES.map((f) => f.code));
  const [active, setActive] = useState(0);

  // HERO_FILES reads entry-first; the worker evaluates one module, so the
  // sources go in reverse — leaf declarations land before the entry uses them.
  const code = useMemo(() => [...sources].reverse().join('\n\n'), [sources]);
  const { url, error, rendering } = useRepl(code);

  const playgroundHref = useMemo(
    () => `/playground?code=${compress(code)}`,
    [code],
  );

  const edit = (value: string) =>
    setSources((prev) => prev.map((s, i) => (i === active ? value : s)));

  const failed = Boolean(error) && !url;

  return (
    <div className="grid h-full grid-rows-[12rem_1fr] md:grid-cols-[1.2fr_1fr] md:grid-rows-1">
      <div className="border-fd-border flex min-h-0 min-w-0 flex-col border-b md:border-e md:border-b-0">
        <div className={stripClass}>
          {/* the tab row scrolls once the pane is narrow enough: fade the cut
              edge so it reads as "keep going" instead of a clipped glyph */}
          <div className="flex h-full min-w-0 flex-1 items-stretch overflow-x-auto mask-r-from-[calc(100%-1.5rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {HERO_FILES.map((file, i) => (
              <button
                key={file.name}
                type="button"
                onClick={() => setActive(i)}
                data-active={i === active}
                aria-pressed={i === active}
                className="data-[active=true]:text-fd-foreground hover:text-fd-foreground data-[active=true]:after:bg-fd-primary relative shrink-0 px-3 font-mono text-[0.6875rem] whitespace-nowrap transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:content-['']"
              >
                {file.name}
              </button>
            ))}
          </div>
        </div>

        {/* a phone can only show part of a file — same treatment, bottom edge */}
        <div className="min-h-0 flex-1 max-md:mask-b-from-[calc(100%-1.75rem)]">
          <Editor
            key={active}
            value={sources[active]}
            onChange={edit}
            basicSetup={EDITOR_CHROME}
          />
        </div>
      </div>

      <div className="bg-fd-muted flex min-h-0 flex-col">
        <div className={`${stripClass} justify-between px-3.5`}>
          <span className="font-mono text-[0.6875rem]">document.pdf</span>

          <a
            href={playgroundHref}
            title="Open this example in the playground"
            className="hover:text-fd-foreground inline-flex shrink-0 items-center gap-1 text-[0.6875rem] transition-colors max-md:hidden"
          >
            Open in Playground
            <ArrowUpRight className="size-3 shrink-0" />
          </a>
        </div>

        <div className="relative flex min-h-0 flex-1 justify-center">
          {failed ? (
            <p className="text-fd-muted-foreground max-w-[22rem] self-center px-6 text-center text-[0.8125rem] leading-relaxed">
              {error?.message}
            </p>
          ) : (
            <div className="aspect-[105/148] h-full">
              <Viewer
                url={url}
                rendering={rendering}
                surfaceClass="bg-transparent p-2.5 md:p-4"
              />
            </div>
          )}

          {/* no line number: it would point into the concatenated source */}
          {error && url && (
            <p className="text-fd-primary bg-fd-background/85 border-fd-primary/25 absolute inset-x-0 bottom-0 max-h-1/2 overflow-auto border-t px-3.5 py-2 font-mono text-[0.6875rem] leading-relaxed whitespace-pre-wrap backdrop-blur">
              {error.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
