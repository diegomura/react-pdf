import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

import activeFileNameAtom from '../../atoms/active-file-name';
import {
  addFileAtom,
  removeFileAtom,
  renameFileAtom,
  selectFileAtom,
} from '../../atoms/file-operations';
import filesAtom from '../../atoms/files';
import type { PartProps, ReplFile } from '../../types';

export interface FilesComponentProps {
  files: ReplFile[];
  activeFile: string | null;
  onSelect: (name: string) => void;
  onAdd: (file: ReplFile) => void;
  onRename: (name: string, next: string) => void;
  onRemove: (name: string) => void;
}

function Files({
  Component,
  className,
  style,
}: PartProps<FilesComponentProps>) {
  const files = useAtomValue(filesAtom);
  const activeFile = useAtomValue(activeFileNameAtom);

  const select = useSetAtom(selectFileAtom);
  const add = useSetAtom(addFileAtom);
  const rename = useSetAtom(renameFileAtom);
  const remove = useSetAtom(removeFileAtom);

  const onSelect = useCallback((name: string) => select(name), [select]);
  const onAdd = useCallback((file: ReplFile) => add(file), [add]);
  const onRename = useCallback(
    (name: string, next: string) => rename(name, next),
    [rename],
  );
  const onRemove = useCallback((name: string) => remove(name), [remove]);

  return (
    <Component
      files={files}
      activeFile={activeFile}
      onSelect={onSelect}
      onAdd={onAdd}
      onRename={onRename}
      onRemove={onRemove}
      className={className}
      style={style}
    />
  );
}

export default Files;
