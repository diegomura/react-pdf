/* eslint-disable no-console */

import React, { useEffect } from 'react';

import usePDF from './usePDF';

export const PDFDownloadLink = ({
  style,
  children,
  className,
  document: doc,
  fileName = 'document.pdf',
}) => {
  const [instance, updateInstance] = usePDF({ document: doc });

  useEffect(updateInstance, [children]);

  if (!doc) {
    console.warn('You should pass a valid document to PDFDownloadLink');
    return null;
  }

  const handleDownloadIE = () => {
    if (window.navigator.msSaveBlob) {
      // IE
      window.navigator.msSaveBlob(instance.blob, fileName);
    }
  };

  return (
    <a
      style={style}
      href={instance.url}
      download={fileName}
      className={className}
      onClick={handleDownloadIE}
    >
      {typeof children === 'function' ? children(instance) : children}
    </a>
  );
};

export default PDFDownloadLink;
