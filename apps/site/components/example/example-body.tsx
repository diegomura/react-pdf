'use client';

import PlaygroundUI, { type EditorComponentProps } from '@react-pdf/ui';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';

import { Editor } from '@/components/editor';
import { PdfPreviewPane } from '@/components/pdf-preview';

const EDITOR_CHROME = {
  highlightActiveLine: false,
  highlightActiveLineGutter: false,
  foldGutter: false,
  lineNumbers: false,
};

const action =
  'text-fd-muted-foreground hover:text-fd-foreground focus-visible:ring-fd-ring inline-flex items-center gap-1.5 rounded-sm text-[0.8125rem] no-underline transition-colors outline-none focus-visible:ring-2';

export interface ExampleBodyProps {
  code: string;
  href: string;
  defaultOpen?: boolean;
}

function ExampleEditor({ value, onChange, error }: EditorComponentProps) {
  return (
    <Editor
      value={value}
      onChange={onChange}
      error={error}
      basicSetup={EDITOR_CHROME}
    />
  );
}

/**
 * The whole example block, and the only heavy module in it — the renderer
 * worker, the PDF viewer and the editor all arrive with this chunk, so it is
 * imported through `next/dynamic` and never on page load.
 */
export function ExampleBody({
  code,
  href,
  defaultOpen = false,
}: ExampleBodyProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <PlaygroundUI files={[{ name: 'example.jsx', code }]}>
      <PdfPreviewPane />

      <div className="border-fd-border bg-fd-card flex h-9 items-center justify-between gap-3 border-t px-3.5">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className={action}
        >
          <ChevronDown
            className={`size-3.5 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          />
          {open ? 'Hide code' : 'Edit code'}
        </button>

        <a href={href} className={action}>
          Open in Playground
          <ArrowUpRight className="size-3.5 shrink-0" />
        </a>
      </div>

      {open && (
        <div
          id={panelId}
          className="border-fd-border max-h-96 overflow-auto border-t"
        >
          <PlaygroundUI.Editor Component={ExampleEditor} />
        </div>
      )}
    </PlaygroundUI>
  );
}
