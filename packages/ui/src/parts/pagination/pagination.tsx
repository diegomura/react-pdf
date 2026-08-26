import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

import numPagesAtom from '../../atoms/num-pages';
import pageAtom, {
  nextPageAtom,
  previousPageAtom,
  setPageAtom,
} from '../../atoms/page';
import type { PartProps } from '../../types';

export interface PaginationComponentProps {
  page: number;
  numPages: number;
  canPrevious: boolean;
  canNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (page: number) => void;
}

function Pagination({
  Component,
  className,
  style,
}: PartProps<PaginationComponentProps>) {
  const page = useAtomValue(pageAtom);
  const numPages = useAtomValue(numPagesAtom);

  const next = useSetAtom(nextPageAtom);
  const previous = useSetAtom(previousPageAtom);
  const select = useSetAtom(setPageAtom);

  const onNext = useCallback(() => next(), [next]);
  const onPrevious = useCallback(() => previous(), [previous]);
  const onSelect = useCallback((value: number) => select(value), [select]);

  // Always renders. Hiding a single page document is a presentational choice
  // and belongs in the Component.
  return (
    <Component
      page={page}
      numPages={numPages}
      canPrevious={page > 1}
      canNext={page < numPages}
      onPrevious={onPrevious}
      onNext={onNext}
      onSelect={onSelect}
      className={className}
      style={style}
    />
  );
}

export default Pagination;
