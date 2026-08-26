import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

import activeFileAtom from '../../atoms/active-file';
import copyStateAtom, { copyAtom } from '../../atoms/copy-state';
import type { CopyState, PartProps } from '../../types';

export interface CopyButtonComponentProps {
  onPress: () => void;
  state: CopyState;
}

export type CopyButtonProps = PartProps<CopyButtonComponentProps> & {
  /** Defaults to the active file's source. */
  value?: string;
};

function CopyButton({ Component, value, className, style }: CopyButtonProps) {
  const file = useAtomValue(activeFileAtom);
  const state = useAtomValue(copyStateAtom);
  const copy = useSetAtom(copyAtom);

  const text = value ?? file?.code ?? '';

  // copy() never rejects; it resolves to 'copied' or 'failed' either way
  const onPress = useCallback(() => {
    copy(text);
  }, [copy, text]);

  return (
    <Component
      onPress={onPress}
      state={state}
      className={className}
      style={style}
    />
  );
}

export default CopyButton;
