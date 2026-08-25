'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// wide panes otherwise blow the page up past comfortable reading size
const MAX_PAGE_WIDTH = 760;

const stepClass =
  'text-fd-muted-foreground hover:text-fd-foreground inline-flex size-6 items-center justify-center rounded-full transition-colors disabled:opacity-30 disabled:hover:text-fd-muted-foreground';

export function Viewer({
  url,
  rendering,
  surfaceClass = 'bg-fd-muted p-4',
}: {
  url: string | null;
  rendering: boolean;
  surfaceClass?: string;
}) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // `my-auto` on the page wrapper centres a short document without clipping a
  // tall one the way `justify-center` would inside a scroll container.
  return (
    <div className="relative flex h-full flex-col">
      <div
        ref={containerRef}
        className={`flex min-h-0 flex-1 flex-col items-center overflow-auto ${surfaceClass}`}
      >
        {url ? (
          <div
            className={`my-auto ${
              rendering ? 'opacity-60 transition-opacity' : 'transition-opacity'
            }`}
          >
            <Document
              file={url}
              onLoadSuccess={({ numPages: n }) => {
                setNumPages(n);
                setPageNumber((p) => Math.min(Math.max(p, 1), n));
              }}
              loading={null}
              error={
                <div className="border-fd-border bg-fd-background text-fd-muted-foreground rounded border p-4 text-sm">
                  Failed to display the PDF — the viewer could not load this
                  document.
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                width={width ? Math.min(width, MAX_PAGE_WIDTH) : MAX_PAGE_WIDTH}
                className="rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_12px_32px_-12px_rgba(0,0,0,0.28)]"
              />
            </Document>
          </div>
        ) : (
          <div className="text-fd-muted-foreground my-auto text-[0.8125rem]">
            Rendering…
          </div>
        )}
      </div>

      {numPages > 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
          <div className="bg-fd-background/85 border-fd-border text-fd-foreground pointer-events-auto flex items-center gap-1 rounded-full border px-1.5 py-1 text-[0.75rem] shadow-lg shadow-black/5 backdrop-blur dark:shadow-black/40">
            <button
              type="button"
              aria-label="Previous page"
              className={stepClass}
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
            >
              <ChevronLeft className="size-3.5" />
            </button>
            <span className="px-1 tabular-nums">
              {pageNumber}
              <span className="text-fd-muted-foreground"> / {numPages}</span>
            </span>
            <button
              type="button"
              aria-label="Next page"
              className={stepClass}
              onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
              disabled={pageNumber >= numPages}
            >
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
