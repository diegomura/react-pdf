import { useAtomValue } from 'jotai';

import errorAtom from '../../atoms/error';
import statusAtom from '../../atoms/status';
import type { PartProps, PlaygroundError, PlaygroundStatus } from '../../types';

export interface StatusComponentProps {
  status: PlaygroundStatus;
  error: PlaygroundError | null;
}

function Status({
  Component,
  className,
  style,
}: PartProps<StatusComponentProps>) {
  const status = useAtomValue(statusAtom);
  const error = useAtomValue(errorAtom);

  return (
    <Component
      status={status}
      error={error}
      className={className}
      style={style}
    />
  );
}

export default Status;
