import React, { useEffect, useRef, useState } from 'react';

import { renderToSVGPages } from './svg-render';

type Props = {
  Document: React.ComponentType;
};

// svgkit renders link targets as inert, unpainted, pointer-events:none
// `[data-rpdf-link]` rects (see @react-pdf/svgkit's README) rather than
// clickable anchors: navigation policy is left to the host. This viewer
// implements that policy the way pdf.js does for its annotation layer —
// reading each rect's geometry and stacking a small absolutely-positioned,
// clickable overlay on top of it, since the rect itself can't be clicked.
const useLinkOverlays = (
  rootRef: React.RefObject<HTMLDivElement>,
  pages: string[] | null,
) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !pages) return undefined;

    const overlays: HTMLElement[] = [];

    root.querySelectorAll<HTMLElement>('[data-page]').forEach((page) => {
      const pageBox = page.getBoundingClientRect();

      page.querySelectorAll<SVGElement>('[data-rpdf-link]').forEach((link) => {
        const target = link.dataset.rpdfLink as string;
        const box = link.getBoundingClientRect();

        const overlay = document.createElement('div');
        overlay.style.cssText = `position:absolute; left:${box.left - pageBox.left}px; top:${box.top - pageBox.top}px; width:${box.width}px; height:${box.height}px; cursor:pointer;`;
        overlay.addEventListener('click', () => {
          if (target.startsWith('#')) {
            root
              .querySelector(target)
              ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            window.open(target, '_blank', 'noopener');
          }
        });

        page.appendChild(overlay);
        overlays.push(overlay);
      });
    });

    return () => overlays.forEach((overlay) => overlay.remove());
  }, [rootRef, pages]);
};

const SVGViewer = ({ Document }: Props) => {
  const [pages, setPages] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let stale = false;

    setPages(null);
    setError(null);

    renderToSVGPages(<Document />).then(
      (result) => {
        if (!stale) setPages(result);
      },
      (err) => {
        if (!stale) setError(err?.message || String(err));
      },
    );

    return () => {
      stale = true;
    };
  }, [Document]);

  useLinkOverlays(rootRef, pages);

  return (
    <div ref={rootRef} className="size-full overflow-auto bg-slate-200">
      {error && (
        <div className="m-6 rounded border border-red-400 bg-red-50 p-4 text-red-800 whitespace-pre-wrap">
          {error}
        </div>
      )}

      {!error && !pages && (
        <div className="flex h-full items-center justify-center text-slate-500">
          Rendering SVG…
        </div>
      )}

      {!error && pages && (
        <div className="flex flex-col items-center gap-6 py-6">
          {pages.map((page, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              data-page={index}
              className="relative bg-white shadow-lg"
              dangerouslySetInnerHTML={{ __html: page }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SVGViewer;
