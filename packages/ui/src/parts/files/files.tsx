import { useAtom, useAtomValue } from 'jotai';

import activeFileNameAtom from '../../atoms/active-file-name';
import filesAtom from '../../atoms/files';
import type { PartProps, PlaygroundFile } from '../../types';

export interface FilesComponentProps {
  files: PlaygroundFile[];
  activeFile: string | null;
  onSelect: (name: string) => void;
}

function Files({
  Component,
  className,
  style,
}: PartProps<FilesComponentProps>) {
  const files = useAtomValue(filesAtom);
  const [activeFile, onSelect] = useAtom(activeFileNameAtom);

  return (
    <Component
      files={files}
      activeFile={activeFile}
      className={className}
      style={style}
      onSelect={onSelect}
    />
  );
}

export default Files;
