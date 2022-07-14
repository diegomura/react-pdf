import { useEffect, useMemo, useRef } from 'react';

import useQueue from './useQueue';
import { pdf } from '../index';

export const useSVG = ({ document }) => {
  const queue = useQueue();

  const pdfInstance = useRef(null);

  useEffect(() => {
    const handleChange = () => queue.add(() => pdfInstance.current.toSVG());

    pdfInstance.current = pdf();
    pdfInstance.current.on('change', handleChange);
    pdfInstance.current.updateContainer(document);

    return () => {
      pdfInstance.current.removeListener('change', handleChange);
    };
  }, []);

  const update = () => {
    pdfInstance.current.updateContainer(document);
  };

  const { value, error, loading } = queue;

  const state = useMemo(() => ({ value, error, loading }), [
    value,
    error,
    loading,
  ]);

  return [state, update];
};

export default useSVG;
