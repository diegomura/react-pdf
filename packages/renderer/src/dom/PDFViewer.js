/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect } from 'react';

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
  const [instance, updateInstance] = usePDF({ document: children });

  useEffect(updateInstance, [children]);

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
