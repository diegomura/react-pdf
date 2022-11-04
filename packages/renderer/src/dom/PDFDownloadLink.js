/* eslint-disable no-console */

import React, { useEffect } from 'react';

import usePDF from './usePDF';

export const PDFDownloadLink = ({
  fileName = 'document.pdf',
  document,
  children,
  onClick,
  href: _filteredOutHref,
  ...rest
}) => {
  const [instance, updateInstance] = usePDF({ document });
  useEffect(updateInstance, [children]);

  if (!document) {
    console.warn('You should pass a valid document to PDFDownloadLink');
    return null;
  }

  const handleDownloadIE = () => {
    if (window.navigator.msSaveBlob) {
      // IE
      window.navigator.msSaveBlob(instance.blob, fileName);
    }
  };

  const handleClick = event => {
    handleDownloadIE();
    if (typeof onClick === 'function') onClick(event, instance);
  };

  return (
    <a
      href={instance.url}
      download={fileName}
      onClick={handleClick}
      {...rest}
    >
      {typeof children === 'function' ? children(instance) : children}
    </a>
  );
};

export default PDFDownloadLink;
