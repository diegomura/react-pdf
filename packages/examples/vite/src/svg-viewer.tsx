import React, { useEffect, useState } from 'react';

import { renderToSVGPages } from './svg-render';

type Props = {
  Document: React.ComponentType;
};

const SVGViewer = ({ Document }: Props) => {
  const [pages, setPages] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="size-full overflow-auto bg-slate-200">
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
            // eslint-disable-next-line react/no-array-index-key
            <div
              key={index}
              className="bg-white shadow-lg"
              dangerouslySetInnerHTML={{ __html: page }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SVGViewer;
