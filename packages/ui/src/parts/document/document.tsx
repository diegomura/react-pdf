import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

import blobAtom from '../../atoms/blob';
import errorAtom from '../../atoms/error';
import numPagesAtom from '../../atoms/num-pages';
import pageAtom, { setNumPagesAtom } from '../../atoms/page';
import statusAtom from '../../atoms/status';
import urlAtom from '../../atoms/url';
import type { PartProps } from '../../types';

export interface DocumentComponentProps {
  url: string | null;
  blob: Blob | null;
  page: number;
  numPages: number;
  rendering: boolean;
  error: Error | null;
  onLoad: (info: { numPages: number }) => void;
}

function Document({
  Component,
  className,
  style,
}: PartProps<DocumentComponentProps>) {
  const url = useAtomValue(urlAtom);
  const blob = useAtomValue(blobAtom);
  const page = useAtomValue(pageAtom);
  const numPages = useAtomValue(numPagesAtom);
  const status = useAtomValue(statusAtom);
  const error = useAtomValue(errorAtom);
  const setNumPages = useSetAtom(setNumPagesAtom);

  // The consumer's PDF renderer is the only thing that knows the page count,
  // so it reports it back here for Pagination to read.
  const onLoad = useCallback(
    ({ numPages: count }: { numPages: number }) => setNumPages(count),
    [setNumPages],
  );

  return (
    <Component
      url={url}
      blob={blob}
      page={page}
      numPages={numPages}
      rendering={status === 'rendering'}
      error={error}
      onLoad={onLoad}
      className={className}
      style={style}
    />
  );
}

export default Document;
