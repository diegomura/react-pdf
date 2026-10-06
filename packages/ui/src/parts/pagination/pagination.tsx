import { useAtom, useAtomValue } from 'jotai';
import { useAtomCallback } from 'jotai/utils';
import { useCallback } from 'react';

import numPagesAtom from '../../atoms/num-pages';
import pageAtom from '../../atoms/page';
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
  const [page, select] = useAtom(pageAtom);
  const numPages = useAtomValue(numPagesAtom);

  const onNext = useAtomCallback(
    useCallback((get, set) => set(pageAtom, get(pageAtom) + 1), []),
  );

  const onPrevious = useAtomCallback(
    useCallback((get, set) => set(pageAtom, get(pageAtom) - 1), []),
  );

  return (
    <Component
      page={page}
      numPages={numPages}
      canPrevious={page > 1}
      canNext={page < numPages}
      className={className}
      style={style}
      onPrevious={onPrevious}
      onNext={onNext}
      onSelect={select}
    />
  );
}

export default Pagination;
