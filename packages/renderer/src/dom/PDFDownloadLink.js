/* eslint-disable no-console */

import { useEffect } from 'react';

import usePDF from './usePDF';

export const PDFDownloadLink = ({
  fileName = 'document.pdf',
  document: doc,
  children,
  onClick,
  href: _filteredOutHref,
  ...rest
}) => {
  const [instance, updateInstance] = usePDF();

  useEffect(() => updateInstance(doc), [doc]);

  if (!doc) {
    console.warn('You should pass a valid document to PDFDownloadLink');
    return null;
  }

  const handleDownloadIE = () => {
    if (instance && window.navigator.msSaveBlob) {
      // IE
      window.navigator.msSaveBlob(instance.blob, fileName);
    }
  };

  const handleClick = (event) => {
    handleDownloadIE();
    if (typeof onClick === 'function') onClick(event, instance);
  };

  return (
    <a href={instance.url} download={fileName} onClick={handleClick} {...rest}>
      {typeof children === 'function' ? children(instance) : children}
    </a>
  );
};

export default PDFDownloadLink;
