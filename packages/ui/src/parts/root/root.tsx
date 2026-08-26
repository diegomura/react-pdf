import { Provider, useAtom, useAtomValue, useStore } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { useEffect, type ReactNode } from 'react';

import activeFileNameAtom from '../../atoms/active-file-name';
import debounceAtom from '../../atoms/debounce';
import filenameAtom from '../../atoms/filename';
import filesAtom from '../../atoms/files';
import renderFnAtom from '../../atoms/render-fn';
import copyResetEffect from '../../effects/copy-reset';
import objectUrlEffect from '../../effects/object-url';
import renderEffect from '../../effects/render';
import type { RenderFn, ReplFile } from '../../types';

export interface RootProps {
  id?: string;
  render: RenderFn;
  defaultFiles: ReplFile[];
  defaultActiveFile?: string;
  onFilesChange?: (files: ReplFile[]) => void;
  onActiveFileChange?: (name: string | null) => void;
  debounce?: number;
  filename?: string;
  children: ReactNode;
}

function Content({
  render,
  defaultFiles,
  defaultActiveFile,
  onFilesChange,
  onActiveFileChange,
  debounce = 500,
  filename = 'document.pdf',
  children,
}: RootProps): ReactNode {
  const store = useStore();

  useHydrateAtoms([
    [filesAtom, defaultFiles],
    [activeFileNameAtom, defaultActiveFile ?? defaultFiles[0]?.name ?? null],
  ] as const);

  // Assigned during render rather than from an effect, so the render effect
  // never mounts before the function it needs is in place. The box is a
  // per-store object that is never `set`, so writing to it re-renders nothing
  // and an inline arrow from the consumer costs nothing.
  const renderFn = useAtomValue(renderFnAtom);
  renderFn.current = render;

  useEffect(() => {
    store.set(debounceAtom, debounce);
  }, [debounce, store]);

  useEffect(() => {
    store.set(filenameAtom, filename);
  }, [filename, store]);

  useAtom(renderEffect);
  useAtom(objectUrlEffect);
  useAtom(copyResetEffect);

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
  // Changing `id` swaps the Provider, which drops every atom with it. That is
  // the documented way to reset a Repl.
  return (
    <Provider key={id}>
      <Content {...props} />
    </Provider>
  );
}

export default Root;
