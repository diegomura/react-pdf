import { useEffect } from 'react';

import usePDF from './usePDF';

export const PDFViewer = ({
  title,
  style,
  className,
  children,
  innerRef,
  showToolbar = true,
  ...props
}) => {
  const [instance, updateInstance] = usePDF();

  useEffect(() => updateInstance(children), [children]);

  const src = instance.url
    ? `${instance.url}#toolbar=${showToolbar ? 1 : 0}`
    : null;

  return (
    <iframe
      src={src}
      title={title}
      ref={innerRef}
      style={style}
      className={className}
      {...props}
    />
  );
};

export default PDFViewer;
