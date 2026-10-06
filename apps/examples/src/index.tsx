import './index.css';

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { PDFViewer } from '@react-pdf/renderer';

import EXAMPLES from './examples';
import SVGViewer from './svg-viewer';

// URL is `#<id>` for PDF (unchanged) or `#<id>/svg` for the SVG backend.
const parseHash = (raw) => {
  const [id, mode] = raw.split('/');
  return { id: id || 'page-wrap', mode: mode === 'svg' ? 'svg' : 'pdf' };
};

const ExamplesPage = () => {
  const [{ id, mode }, setLocation] = useState(
    parseHash(window.location.hash.substring(1)),
  );

  const index = EXAMPLES.findIndex((example) => example.id === id);

  useEffect(() => {
    const listener = (event) =>
      setLocation(parseHash(event.target.location.hash.substring(1)));

    window.addEventListener('popstate', listener);

    return () => window.removeEventListener('popstate', listener);
  });

  const { Document } = EXAMPLES[index];

  return (
    <main className="w-screen h-screen flex">
      <nav className="bg-slate-100 w-60 flex flex-col">
        <div className="flex border-b border-slate-300 text-sm">
          <a
            href={`#${id}`}
            className={`flex-1 text-center py-2 ${mode === 'pdf' ? 'bg-slate-300 font-semibold' : 'hover:bg-slate-200'}`}
          >
            PDF
          </a>
          <a
            href={`#${id}/svg`}
            className={`flex-1 text-center py-2 ${mode === 'svg' ? 'bg-slate-300 font-semibold' : 'hover:bg-slate-200'}`}
          >
            SVG
          </a>
        </div>

        <ul className="overflow-auto">
          {EXAMPLES.map((example) => (
            <li
              key={example.id}
              className="hover:bg-slate-200 w-full px-4 py-1 cursor-pointer transition-all border-b border-slate-300 flex"
            >
              <a
                href={`#${example.id}${mode === 'svg' ? '/svg' : ''}`}
                className="flex-1"
              >
                {example.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div key={`${id}/${mode}`} className="h-full flex-1">
        {mode === 'svg' ? (
          <SVGViewer Document={Document} />
        ) : (
          <PDFViewer showToolbar={false} className="size-full">
            <Document />
          </PDFViewer>
        )}
      </div>
    </main>
  );
};

const MOUNT_ELEMENT = document.createElement('div');

document.body.appendChild(MOUNT_ELEMENT);

const root = createRoot(MOUNT_ELEMENT);

root.render(<ExamplesPage />);
