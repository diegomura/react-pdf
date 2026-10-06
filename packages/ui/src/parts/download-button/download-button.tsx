import { useAtomValue } from 'jotai';
import { useCallback } from 'react';

import filenameAtom from '../../atoms/filename';
import urlAtom from '../../atoms/url';
import type { PartProps } from '../../types';

export interface DownloadButtonComponentProps {
  onPress: () => void;
  href: string | undefined;
  filename: string;
  disabled: boolean;
}

function DownloadButton({
  Component,
  className,
  style,
}: PartProps<DownloadButtonComponentProps>) {
  const url = useAtomValue(urlAtom);
  const filename = useAtomValue(filenameAtom);

  const onPress = useCallback(() => {
    if (!url) return;

    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = filename;
    anchor.click();
  }, [url, filename]);

  return (
    <Component
      onPress={onPress}
      href={url ?? undefined}
      filename={filename}
      disabled={!url}
      className={className}
      style={style}
    />
  );
}

export default DownloadButton;
