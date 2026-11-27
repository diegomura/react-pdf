import { useAtomCallback } from 'jotai/utils';
import { useCallback, useEffect, useState } from 'react';

import activeFileAtom from '../../atoms/active-file';
import type { CopyState, PartProps } from '../../types';

const RESET_MS = 1500;

export interface CopyButtonComponentProps {
  onPress: () => void;
  state: CopyState;
}

function CopyButton({
  Component,
  className,
  style,
}: PartProps<CopyButtonComponentProps>) {
  const [state, setState] = useState<CopyState>('idle');

  const onPress = useAtomCallback(
    useCallback((get) => {
      navigator.clipboard.writeText(get(activeFileAtom)?.code ?? '').then(
        () => setState('copied'),
        () => setState('failed'),
      );
    }, []),
  );

  useEffect(() => {
    if (state === 'idle') return undefined;

    const timer = setTimeout(() => setState('idle'), RESET_MS);

    return () => clearTimeout(timer);
  }, [state]);

  return (
    <Component
      state={state}
      className={className}
      style={style}
      onPress={onPress}
    />
  );
}

export default CopyButton;
