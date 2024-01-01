/* eslint-disable no-console */

import { useEffect } from 'react';

import usePDF from './usePDF';

export const PDFDownloadLink = ({
  style,
  children,
  className,
  document: doc,
  fileName = 'document.pdf',
  onClick,
}) => {
  const [instance, updateInstance] = usePDF();

  useEffect(() => updateInstance(doc), [doc]);

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

  const handleClick = event => {
    handleDownloadIE();
    if (typeof onClick === 'function') onClick(event, instance);
  };

  return (
    <a
      style={style}
      href={instance.url}
      download={fileName}
      className={className}
      onClick={handleClick}
    >
      {typeof children === 'function' ? children(instance) : children}
    </a>
  );
};

export default PDFDownloadLink;
