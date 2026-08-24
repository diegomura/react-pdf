'use client';

import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const MAX_PAGE_WIDTH = 900;

export function Viewer({
  url,
  rendering,
}: {
  url: string | null;
  rendering: boolean;
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

  return (
    <div
      ref={containerRef}
      className="flex h-full flex-col items-center overflow-auto bg-fd-muted p-4"
    >
      {url ? (
        <>
          <div
            className={
              rendering ? 'opacity-60 transition-opacity' : 'transition-opacity'
            }
          >
            <Document
              file={url}
              onLoadSuccess={({ numPages: n }) => {
                setNumPages(n);
                setPageNumber((p) => Math.min(Math.max(p, 1), n));
              }}
              loading={null}
              error={null}
            >
              <Page
                pageNumber={pageNumber}
                width={
                  width ? Math.min(width - 32, MAX_PAGE_WIDTH) : MAX_PAGE_WIDTH
                }
                className="shadow-2xl"
              />
            </Document>
          </div>
          {numPages > 1 && (
            <div className="mt-3 flex items-center gap-3 text-sm">
              <button
                type="button"
                aria-label="Previous page"
                className="rounded border border-fd-border px-2 py-1 disabled:opacity-40"
                onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
              >
                ←
              </button>
              <span className="tabular-nums">
                {pageNumber} / {numPages}
              </span>
              <button
                type="button"
                aria-label="Next page"
                className="rounded border border-fd-border px-2 py-1 disabled:opacity-40"
                onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
                disabled={pageNumber >= numPages}
              >
                →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex h-full items-center justify-center text-fd-muted-foreground">
          Rendering…
        </div>
      )}
    </div>
  );
}
