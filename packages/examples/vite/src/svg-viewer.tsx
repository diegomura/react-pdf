import React, { useEffect, useRef, useState } from 'react';

import { renderToSVGPages } from './svg-render';

type Props = {
  Document: React.ComponentType;
};

// svgkit renders links, form fields and notes as inert, unpainted,
// pointer-events:none annotations — `[data-rpdf-link]`, `[data-rpdf-field]`,
// `[data-rpdf-note]` (see @react-pdf/svgkit's README) — rather than native
// interactive elements: policy is left to the host. This viewer implements
// that policy the way pdf.js does for its annotation layer — reading each
// annotation's geometry and stacking a small absolutely-positioned element
// on top of it, since the underlying SVG node itself can't be interacted with.
const placeOverlay = (el: HTMLElement, box: DOMRect, pageBox: DOMRect) => {
  el.style.position = 'absolute';
  el.style.left = `${box.left - pageBox.left}px`;
  el.style.top = `${box.top - pageBox.top}px`;
  el.style.width = `${box.width}px`;
  el.style.height = `${box.height}px`;
  el.style.boxSizing = 'border-box';
  el.style.margin = '0';
};

const useAnnotationOverlays = (
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
        placeOverlay(overlay, box, pageBox);
        overlay.style.cursor = 'pointer';
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

      page
        .querySelectorAll<SVGElement>('[data-rpdf-field]')
        .forEach((field) => {
          const {
            rpdfField: type,
            rpdfFieldValue: value,
            rpdfFieldChecked,
            rpdfFieldOptions,
            rpdfFieldMultiline,
            rpdfFieldPassword,
            rpdfFieldReadonly,
          } = field.dataset;
          const box = field.getBoundingClientRect();

          let control:
            | HTMLInputElement
            | HTMLSelectElement
            | HTMLTextAreaElement;

          if (type === 'checkbox') {
            control = document.createElement('input');
            control.type = 'checkbox';
            control.checked = rpdfFieldChecked === 'true';
          } else if (type === 'combo' || type === 'list') {
            control = document.createElement('select');
            const options: string[] = rpdfFieldOptions
              ? JSON.parse(rpdfFieldOptions)
              : [];
            options.forEach((option) => {
              const optionEl = document.createElement('option');
              optionEl.value = option;
              optionEl.textContent = option;
              optionEl.selected = option === value;
              control.appendChild(optionEl);
            });
          } else if (rpdfFieldMultiline === 'true') {
            control = document.createElement('textarea');
            control.value = value || '';
          } else {
            control = document.createElement('input');
            control.type = rpdfFieldPassword === 'true' ? 'password' : 'text';
            control.value = value || '';
          }

          control.disabled = rpdfFieldReadonly === 'true';
          placeOverlay(control, box, pageBox);

          page.appendChild(control);
          overlays.push(control);
        });

      page.querySelectorAll<SVGElement>('[data-rpdf-note]').forEach((note) => {
        const contents = note.dataset.rpdfNote as string;
        const box = note.getBoundingClientRect();

        const marker = document.createElement('div');
        placeOverlay(marker, box, pageBox);
        marker.style.cursor = 'pointer';
        marker.title = contents;
        marker.addEventListener('click', () => window.alert(contents));

        page.appendChild(marker);
        overlays.push(marker);
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

  useAnnotationOverlays(rootRef, pages);

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
