'use client';

import PlaygroundUI, { type DocumentComponentProps } from '@react-pdf/ui';
import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { Pager } from './pager';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// wide panes otherwise blow the page up past comfortable reading size
const MAX_PAGE_WIDTH = 760;

// A4 portrait, so the first paint is already fitted for the common case and
// only unusual page sizes reflow once `onLoadSuccess` reports the real ratio.
const A4_RATIO = 1 / Math.SQRT2;

// the floating pager overlaps the surface; keep the page clear of it
const PAGER_HEIGHT = 36;

export type ViewerProps = DocumentComponentProps & { className?: string };

/**
 * The site's `Component` for `PlaygroundUI.Document`. Page count and current page
 * come from the library; sizing does not, because how large a page should be
 * is a layout decision.
 */
export function Viewer({
  url,
  page,
  numPages,
  rendering,
  className = 'bg-fd-muted p-4',
}: ViewerProps) {
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [ratio, setRatio] = useState(A4_RATIO);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setBox((prev) =>
        prev.width === width && prev.height === height
          ? prev
          : { width, height },
      );
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // fit-to-page: the whole page has to be visible without scrolling, so the
  // pane's height drives the width unless the pane is the narrower constraint.
  // Zero until the observer has measured — rendering a page at a guessed size
  // only to resize it a frame later is the one thing the eye does catch.
  const available = box.height - (numPages > 1 ? PAGER_HEIGHT : 0);
  const pageWidth = Math.floor(
    Math.max(Math.min(box.width, available * ratio, MAX_PAGE_WIDTH), 0),
  );

  // `my-auto` on the page wrapper centres a short document without clipping a
  // tall one the way `justify-center` would inside a scroll container. The
  // wrapper is a blank page in its own right: react-pdf drops the canvas while
  // it reloads a new object URL, and an empty page holds still where a gap
  // would blink.
  return (
    <div className="relative flex h-full flex-col">
      <div
        ref={containerRef}
        className={`flex min-h-0 flex-1 flex-col items-center overflow-auto ${className}`}
      >
        {pageWidth > 0 && (
          <div
            className={`my-auto overflow-hidden rounded-[2px] bg-white transition-opacity shadow-[0_1px_2px_rgba(0,0,0,0.08),0_12px_32px_-12px_rgba(0,0,0,0.28)] ${
              url && !rendering ? '' : 'opacity-60'
            }`}
            style={{ width: pageWidth, height: Math.round(pageWidth / ratio) }}
          >
            {url && (
              <Document
                file={url}
                loading={null}
                error={
                  <div className="text-fd-muted-foreground p-4 text-sm">
                    Failed to display the PDF — the viewer could not load this
                    document.
                  </div>
                }
              >
                <Page
                  pageNumber={page}
                  width={pageWidth}
                  onLoadSuccess={(loaded) => {
                    const view = loaded.getViewport({ scale: 1 });
                    setRatio(view.width / view.height);
                  }}
                />
              </Document>
            )}
          </div>
        )}
      </div>

      <PlaygroundUI.Pagination Component={Pager} />
    </div>
  );
}
