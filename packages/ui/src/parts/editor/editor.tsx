import { useAtom, useAtomValue } from 'jotai';

import activeFileAtom from '../../atoms/active-file';
import errorAtom from '../../atoms/error';
import type { PartProps, PlaygroundError } from '../../types';

export interface EditorComponentProps {
  value: string;
  onChange: (value: string) => void;
  fileName: string;
  error: PlaygroundError | null;
}

function Editor({
  Component,
  className,
  style,
}: PartProps<EditorComponentProps>) {
  const [file, update] = useAtom(activeFileAtom);
  const error = useAtomValue(errorAtom);

  if (!file) return null;

  return (
    <Component
      value={file.code}
      fileName={file.name}
      error={error}
      className={className}
      style={style}
      onChange={update}
    />
  );
}

export default Editor;
