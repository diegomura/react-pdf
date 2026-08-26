'use client';

import PlaygroundUI, { type DocumentComponentProps } from '@react-pdf/ui';

import { Viewer } from '@/components/viewer';

export interface PdfPreviewProps {
  code: string;
}

function Document(props: DocumentComponentProps) {
  if (props.error && !props.url)
    return (
      <p className="text-fd-muted-foreground flex h-full items-center justify-center px-8 text-center text-[0.8125rem] text-balance">
        This example can’t be previewed here. Open it in the playground to run
        it.
      </p>
    );

  return <Viewer {...props} className="bg-transparent p-5" />;
}

/**
 * The rendered page on its own. Use it when the playground store is already
 * mounted — an editor next to it has to sit in the same store to drive it.
 */
export function PdfPreviewPane() {
  return (
    <div className="bg-fd-muted h-[19rem] sm:h-[26rem]">
      <PlaygroundUI.Document Component={Document} />
    </div>
  );
}

/**
 * A snippet rendered to a PDF, self-contained. Heavy — the renderer worker and
 * the PDF viewer come with it — so import it through `next/dynamic`.
 */
export function PdfPreview({ code }: PdfPreviewProps) {
  return (
    <PlaygroundUI files={[{ name: 'example.jsx', code }]}>
      <PdfPreviewPane />
    </PlaygroundUI>
  );
}
