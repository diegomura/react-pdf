import { useAtomValue } from 'jotai';

import blobAtom from '../../atoms/blob';
import errorAtom from '../../atoms/error';
import numPagesAtom from '../../atoms/num-pages';
import pageAtom from '../../atoms/page';
import statusAtom from '../../atoms/status';
import urlAtom from '../../atoms/url';
import type { PartProps, PlaygroundError } from '../../types';

export interface DocumentComponentProps {
  url: string | null;
  blob: Blob | null;
  page: number;
  numPages: number;
  rendering: boolean;
  error: PlaygroundError | null;
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

  return (
    <Component
      url={url}
      blob={blob}
      page={page}
      numPages={numPages}
      rendering={status === 'rendering'}
      error={error}
      className={className}
      style={style}
    />
  );
}

export default Document;
