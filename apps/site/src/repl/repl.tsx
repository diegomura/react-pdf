'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, Download, Link2 } from 'lucide-react';
import { useState, useSyncExternalStore } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';

import { GithubLink } from '@/components/github-stars';
import { ThemeToggle, Wordmark } from '@/components/site-nav';

import { compress } from './compress';
import { Editor } from './editor';
import { examples } from './examples';
import { ExamplePicker } from './example-picker';
import { Status } from './status';
import { initialState } from './url';
import { useRepl } from './use-repl';
import { Viewer } from './viewer';

// Only the lazy @react-pdf/math chunk load; other fetch failures (fonts,
// images) carry their own useful message.
const friendlyError = (message: string) =>
  /dynamically imported module|Importing a module script failed|Failed to load chunk|@react-pdf\/math/i.test(
    message,
  )
    ? 'Failed to load @react-pdf/math — check your connection and retry'
    : message;

const actionClass =
  'bg-fd-muted/60 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-[0.8125rem] font-medium transition-colors disabled:pointer-events-none disabled:opacity-40';

const stripClass =
  'border-fd-border text-fd-muted-foreground flex shrink-0 items-center justify-between border-b px-3.5';

const fileClass = 'font-mono text-[0.6875rem]';

let desktopQuery: MediaQueryList | undefined;
const query = () => (desktopQuery ??= matchMedia('(min-width: 768px)'));

const subscribe = (onChange: () => void) => {
  query().addEventListener('change', onChange);
  return () => query().removeEventListener('change', onChange);
};

const useIsDesktop = () =>
  useSyncExternalStore(
    subscribe,
    () => query().matches,
    () => true,
  );

export function Repl() {
  const params = useSearchParams();
  const [initial] = useState(() => initialState(params as URLSearchParams));
  const [code, setCode] = useState(initial.code);
  const [example, setExample] = useState(initial.example);
  const [resetKey, setResetKey] = useState(0);
  const [tab, setTab] = useState<'code' | 'pdf'>('code');
  const [copied, setCopied] = useState<'ok' | 'failed' | null>(null);
  const isDesktop = useIsDesktop();

  const { url, error, rendering } = useRepl(code, resetKey);

  const selectExample = (name: string) => {
    setExample(name);
    setCode(examples[name]);
    setResetKey((key) => key + 1);
    history.replaceState(null, '', `/playground?example=${name}`);
  };

  const copyLink = () => {
    navigator.clipboard
      .writeText(`${location.origin}/playground?code=${compress(code)}`)
      .then(
        () => setCopied('ok'),
        () => setCopied('failed'),
      )
      .finally(() => setTimeout(() => setCopied(null), 1500));
  };

  const editor = (
    <div className="bg-fd-background flex h-full flex-col">
      {isDesktop && (
        <div className={`${stripClass} h-9`}>
          <span className={fileClass}>{example || 'snippet'}.jsx</span>
        </div>
      )}
      <div className="min-h-0 flex-1">
        <Editor value={code} onChange={setCode} />
      </div>
    </div>
  );

  const preview = (
    <div className="flex h-full flex-col">
      {isDesktop && (
        <div className={`${stripClass} h-9`}>
          <span className={fileClass}>document.pdf</span>
          <Status rendering={rendering} failed={Boolean(error) && !url} />
        </div>
      )}
      <div className="relative min-h-0 flex-1">
        <Viewer
          url={url}
          rendering={rendering}
          surfaceClass="bg-fd-muted px-5 py-6 md:px-8 md:py-8"
        />
        {error && (
          <p className="text-fd-primary bg-fd-background/90 border-fd-primary/25 absolute inset-x-0 bottom-0 max-h-1/2 overflow-auto border-t px-3.5 py-2.5 font-mono text-[0.6875rem] leading-relaxed whitespace-pre-wrap backdrop-blur">
            {friendlyError(error.message)}
            {error.line ? ` (line ${error.line})` : ''}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      {/* z-index and no backdrop-filter: the panes below must not paint over
          the example picker's popover */}
      <header className="bg-fd-background relative z-30 flex h-14 shrink-0 items-center gap-2 px-3 sm:px-4">
        <Wordmark />
        <span
          aria-hidden
          className="text-fd-muted-foreground/40 ms-0.5 max-sm:hidden"
        >
          /
        </span>
        <span className="text-fd-muted-foreground me-1 text-[0.8125rem] max-sm:hidden">
          playground
        </span>

        <ExamplePicker value={example} onSelect={selectExample} />

        <div className="ms-auto flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/docs/v4"
            className="text-fd-muted-foreground hover:text-fd-foreground me-1 text-[0.8125rem] transition-colors max-lg:hidden"
          >
            Docs
          </Link>
          <span className="max-lg:hidden">
            <GithubLink />
          </span>

          <button type="button" className={actionClass} onClick={copyLink}>
            {copied === 'ok' ? (
              <Check className="size-3.5 shrink-0 text-emerald-500" />
            ) : (
              <Link2 className="size-3.5 shrink-0" />
            )}
            <span className="max-sm:hidden">
              {copied === 'ok'
                ? 'Copied'
                : copied === 'failed'
                  ? 'Copy failed'
                  : 'Copy link'}
            </span>
          </button>

          <a
            href={url ?? undefined}
            download="document.pdf"
            aria-disabled={!url}
            className={`${actionClass} ${url ? '' : 'pointer-events-none opacity-40'}`}
          >
            <Download className="size-3.5 shrink-0" />
            <span className="max-sm:hidden">Download</span>
          </a>

          <ThemeToggle />
        </div>
      </header>

      <main className="min-h-0 flex-1 px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="border-fd-border bg-fd-background h-full overflow-hidden rounded-xl border shadow-sm dark:shadow-none">
          {isDesktop ? (
            <Group orientation="horizontal" className="h-full">
              <Panel defaultSize="50" minSize="25">
                {editor}
              </Panel>
              <Separator className="bg-fd-border hover:bg-fd-primary active:bg-fd-primary relative w-px shrink-0 cursor-col-resize transition-colors after:absolute after:inset-y-0 after:-left-1.5 after:-right-1.5 after:content-['']" />
              <Panel defaultSize="50" minSize="25">
                {preview}
              </Panel>
            </Group>
          ) : (
            <div className="flex h-full flex-col">
              <div className={`${stripClass} h-11 gap-2`}>
                <div className="bg-fd-muted/60 inline-flex rounded-md border p-0.5 text-[0.8125rem]">
                  {(['code', 'pdf'] as const).map((name) => (
                    <button
                      key={name}
                      type="button"
                      data-active={tab === name}
                      aria-pressed={tab === name}
                      onClick={() => setTab(name)}
                      className="data-[active=true]:bg-fd-background data-[active=true]:text-fd-foreground rounded-[5px] px-3 py-1 font-medium transition-colors data-[active=true]:shadow-sm"
                    >
                      {name === 'code' ? 'Code' : 'PDF'}
                    </button>
                  ))}
                </div>
                <Status rendering={rendering} failed={Boolean(error) && !url} />
              </div>
              <div className="min-h-0 flex-1">
                {tab === 'code' ? editor : preview}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
