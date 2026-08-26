import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

import activeFileAtom from '../../atoms/active-file';
import { updateSourceAtom } from '../../atoms/file-operations';
import type { PartProps } from '../../types';

export interface EditorComponentProps {
  value: string;
  onChange: (value: string) => void;
  fileName: string;
}

function Editor({
  Component,
  className,
  style,
}: PartProps<EditorComponentProps>) {
  const file = useAtomValue(activeFileAtom);
  const update = useSetAtom(updateSourceAtom);

  const onChange = useCallback((value: string) => update(value), [update]);

  if (!file) return null;

  return (
    <Component
      value={file.code}
      onChange={onChange}
      fileName={file.name}
      className={className}
      style={style}
    />
  );
}

export default Editor;
