import './index.css';

import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { PDFViewer } from '@react-pdf/renderer';

import EXAMPLES from './examples';

const ExamplesPage = () => {
  const [hash, setHash] = useState(
    window.location.hash.substring(1) || 'page-wrap'
  );

  const index = EXAMPLES.findIndex((example) => example.id === hash);

  useEffect(() => {
    const listener = (event) =>
      setHash(event.target.location.hash.substring(1));
    window.addEventListener('popstate', listener);
    return () => window.removeEventListener('popstate', listener);
  });

  const { Document } = EXAMPLES[index];

  return (
    <main className="w-screen h-screen flex">
      <nav className="bg-slate-100 w-60">
        <ul>
          {EXAMPLES.map((example) => (
            <li
              key={example.id}
              className="hover:bg-slate-200 w-full px-4 py-1 cursor-pointer transition-all border-b border-slate-300 flex"
            >
              <a href={`#${example.id}`} className="flex-1">
                {example.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div key={hash} className="h-full flex-1">
        <PDFViewer showToolbar={false} className="size-full">
          <Document />
        </PDFViewer>
      </div>
    </main>
  );
};

const MOUNT_ELEMENT = document.createElement('div');

document.body.appendChild(MOUNT_ELEMENT);

const root = createRoot(MOUNT_ELEMENT);

root.render(<ExamplesPage />);
