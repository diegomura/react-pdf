'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useMemo, useState, useSyncExternalStore } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';

import { compress } from './compress';
import { Editor } from './editor';
import { examples } from './examples';
import { initialCode, DEFAULT_EXAMPLE } from './url';
import { useRepl } from './use-repl';
import { Viewer } from './viewer';

const EXAMPLE_NAMES = Object.keys(examples).sort();

const friendlyError = (message: string) =>
  /dynamically imported module|Importing a module script failed|Failed to fetch|error loading dynamically/i.test(
    message,
  )
    ? 'Failed to load @react-pdf/math — check your connection and retry'
    : message;

const buttonClass =
  'rounded border border-fd-border px-2 py-1 text-sm hover:bg-fd-accent disabled:opacity-40';

const DESKTOP = '(min-width: 768px)';

const subscribe = (onChange: () => void) => {
  const query = matchMedia(DESKTOP);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

const useIsDesktop = () =>
  useSyncExternalStore(
    subscribe,
    () => matchMedia(DESKTOP).matches,
    () => true,
  );

export function Repl() {
  const params = useSearchParams();
  const [code, setCode] = useState(() =>
    initialCode(params as URLSearchParams),
  );
  const [example, setExample] = useState(() =>
    params.get('code')
      ? ''
      : (params.get('example') ?? DEFAULT_EXAMPLE) in examples
        ? (params.get('example') ?? DEFAULT_EXAMPLE)
        : DEFAULT_EXAMPLE,
  );
  const [resetKey, setResetKey] = useState(0);
  const [tab, setTab] = useState<'code' | 'pdf'>('code');
  const [copied, setCopied] = useState(false);
  const isDesktop = useIsDesktop();

  const { url, error, rendering } = useRepl(code, resetKey);

  const selectExample = (name: string) => {
    setExample(name);
    setCode(examples[name]);
    setResetKey((key) => key + 1);
    history.replaceState(null, '', `/repl?example=${name}`);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(
      `${location.origin}/repl?code=${compress(code)}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const editor = useMemo(
    () => (
      <div className="h-full overflow-auto">
        <Editor value={code} onChange={setCode} />
      </div>
    ),
    [code],
  );

  const preview = (
    <div className="relative h-full">
      <Viewer url={url} rendering={rendering} />
      {error && (
        <div className="absolute inset-x-0 bottom-0 max-h-1/2 overflow-auto border-t border-red-500/40 bg-red-950/80 p-3 font-mono text-xs whitespace-pre-wrap text-red-300 backdrop-blur">
          {friendlyError(error.message)}
          {error.line ? ` (line ${error.line})` : ''}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-dvh flex-col">
      <header className="flex items-center gap-2 border-b border-fd-border px-3 py-2">
        <Link href="/" className="font-semibold whitespace-nowrap">
          react-pdf
        </Link>

        <select
          aria-label="Example"
          value={example}
          onChange={(event) => selectExample(event.target.value)}
          className="max-w-40 rounded border border-fd-border bg-fd-background px-2 py-1 text-sm"
        >
          {!example && <option value="">Custom</option>}
          {EXAMPLE_NAMES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        {!isDesktop && (
          <div className="flex gap-1">
            <button
              type="button"
              className={buttonClass}
              aria-pressed={tab === 'code'}
              onClick={() => setTab('code')}
            >
              Code
            </button>
            <button
              type="button"
              className={buttonClass}
              aria-pressed={tab === 'pdf'}
              onClick={() => setTab('pdf')}
            >
              PDF
            </button>
          </div>
        )}

        <div className="ml-auto flex items-center gap-2">
          <button type="button" className={buttonClass} onClick={copyLink}>
            {copied ? 'Copied ✓' : 'Copy link'}
          </button>
          {url && (
            <a href={url} download="document.pdf" className={buttonClass}>
              Download
            </a>
          )}
        </div>
      </header>

      {isDesktop ? (
        <Group orientation="horizontal" className="min-h-0 flex-1">
          <Panel defaultSize="50" minSize="20">
            {editor}
          </Panel>
          <Separator className="w-px bg-fd-border hover:bg-fd-primary" />
          <Panel defaultSize="50" minSize="20">
            {preview}
          </Panel>
        </Group>
      ) : (
        <div className="min-h-0 flex-1">
          {tab === 'code' ? editor : preview}
        </div>
      )}
    </div>
  );
}
