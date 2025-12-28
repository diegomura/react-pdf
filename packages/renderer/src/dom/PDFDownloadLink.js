import { forwardRef, useEffect } from 'react';

import usePDF from './usePDF';

const PDFDownloadLinkBase = (
  {
    fileName = 'document.pdf',
    document: doc,
    children,
    onClick,
    href,
    ...rest
  },
  ref,
) => {
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
    <a
      href={instance.url}
      download={fileName}
      onClick={handleClick}
      ref={ref}
      {...rest}
    >
      {typeof children === 'function' ? children(instance) : children}
    </a>
  );
};

export const PDFDownloadLink = forwardRef(PDFDownloadLinkBase);

export default PDFDownloadLink;
