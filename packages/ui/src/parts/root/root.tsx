import { Provider, useStore } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { useEffect, type ReactNode } from 'react';

import activeFileNameAtom from '../../atoms/active-file-name';
import filenameAtom from '../../atoms/filename';
import filesAtom from '../../atoms/files';
import type { PlaygroundFile } from '../../types';

export interface RootProps {
  id?: string;
  files: PlaygroundFile[];
  filename?: string;
  children: ReactNode;
  onFilesChange?: (files: PlaygroundFile[]) => void;
  onActiveFileChange?: (name: string | null) => void;
}

function Content({
  files,
  filename = 'document.pdf',
  children,
  onFilesChange,
  onActiveFileChange,
}: RootProps): ReactNode {
  const store = useStore();

  // Selection starts at the first file; activeFileNameAtom falls back to it.
  useHydrateAtoms([[filesAtom, files]] as const);

  useEffect(() => {
    store.set(filenameAtom, filename);
  }, [filename, store]);

  useEffect(() => {
    if (!onFilesChange) return undefined;
    return store.sub(filesAtom, () => onFilesChange(store.get(filesAtom)));
  }, [onFilesChange, store]);

  useEffect(() => {
    if (!onActiveFileChange) return undefined;
    return store.sub(activeFileNameAtom, () =>
      onActiveFileChange(store.get(activeFileNameAtom)),
    );
  }, [onActiveFileChange, store]);

  return children;
}

function Root({ id, ...props }: RootProps) {
  return (
    <Provider key={id}>
      <Content {...props} />
    </Provider>
  );
}

export default Root;
