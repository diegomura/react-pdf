import { useEffect } from 'react';

import usePDF from './usePDF';

export const BlobProvider = ({ document: doc, children }) => {
  const [instance, updateInstance] = usePDF();

  useEffect(() => updateInstance(doc), [doc]);

  if (!doc) {
    console.warn('You should pass a valid document to BlobProvider');
    return null;
  }

  return children(instance);
};

export default BlobProvider;
