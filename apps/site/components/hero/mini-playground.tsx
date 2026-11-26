'use client';

import PlaygroundUI, {
  type DocumentComponentProps,
  type EditorComponentProps,
  type FilesComponentProps,
} from '@react-pdf/ui';
import { ArrowUpRight } from 'lucide-react';
import { useMemo, useState } from 'react';

import { compress } from '@/lib/compress';
import { Editor } from '@/components/editor';
import { Viewer } from '@/components/viewer';

import { HERO_FILES } from './constants';

const EDITOR_CHROME = {
  highlightActiveLine: false,
  highlightActiveLineGutter: false,
  foldGutter: false,
  lineNumbers: false,
};

const stripClass =
  'border-fd-border text-fd-muted-foreground flex h-9 shrink-0 items-center border-b';

function Tabs({ files, activeFile, onSelect }: FilesComponentProps) {
  return (
    // the tab row scrolls once the pane is narrow enough: fade the cut edge so
    // it reads as "keep going" instead of a clipped glyph
    <div className="flex h-full min-w-0 flex-1 items-stretch overflow-x-auto mask-r-from-[calc(100%-1.5rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {files.map((file) => (
        <button
          key={file.name}
          type="button"
          onClick={() => onSelect(file.name)}
          data-active={file.name === activeFile}
          aria-pressed={file.name === activeFile}
          className="data-[active=true]:text-fd-foreground hover:text-fd-foreground data-[active=true]:after:bg-fd-primary relative shrink-0 px-3 font-mono text-[0.6875rem] whitespace-nowrap transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:content-['']"
        >
          {file.name}
        </button>
      ))}
    </div>
  );
}

function HeroEditor({ value, onChange, fileName }: EditorComponentProps) {
  return (
    <Editor
      key={fileName}
      value={value}
      onChange={onChange}
      basicSetup={EDITOR_CHROME}
    />
  );
}

function HeroPreview(props: DocumentComponentProps) {
  const { url, error } = props;

  if (error && !url)
    return (
      <p className="text-fd-muted-foreground max-w-[22rem] self-center px-6 text-center text-[0.8125rem] leading-relaxed">
        {error.message}
      </p>
    );

  return (
    <>
      <div className="size-full">
        <Viewer {...props} className="bg-transparent p-2.5 md:p-4" />
      </div>

      {/* no line number: it would point into the concatenated source */}
      {error && (
        <p className="text-fd-primary bg-fd-background/85 border-fd-primary/25 absolute inset-x-0 bottom-0 max-h-1/2 overflow-auto border-t px-3.5 py-2 font-mono text-[0.6875rem] leading-relaxed whitespace-pre-wrap backdrop-blur">
          {error.message}
        </p>
      )}
    </>
  );
}

export function MiniPlayground() {
  const [files, setFiles] = useState(HERO_FILES);

  const playgroundHref = useMemo(
    () => `/playground?code=${compress(files.map((f) => f.code).join('\n\n'))}`,
    [files],
  );

  return (
    <PlaygroundUI files={HERO_FILES} onFilesChange={setFiles}>
      <div className="grid h-full grid-rows-[12rem_1fr] md:grid-cols-[1.2fr_1fr] md:grid-rows-1">
        <div className="border-fd-border flex min-h-0 min-w-0 flex-col border-b md:border-e md:border-b-0">
          <div className={stripClass}>
            <PlaygroundUI.Files Component={Tabs} />
          </div>

          {/* a phone can only show part of a file — same treatment, bottom edge */}
          <div className="min-h-0 flex-1 max-md:mask-b-from-[calc(100%-1.75rem)]">
            <PlaygroundUI.Editor Component={HeroEditor} />
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
            <PlaygroundUI.Document Component={HeroPreview} />
          </div>
        </div>
      </div>
    </PlaygroundUI>
  );
}
