/* eslint-disable no-console */

import queue from 'queue';
import { useState, useRef, useEffect, useCallback } from 'react';

import { pdf } from '../index';

export const usePDF = ({ document }) => {
  const pdfInstance = useRef(null);

  const [state, setState] = useState({
    url: null,
    blob: null,
    error: null,
    loading: !!document,
  });

  // Setup rendering queue
  useEffect(() => {
    const renderQueue = queue({ autostart: true, concurrency: 1 });

    const queueDocumentRender = () => {
      setState(prev => ({ ...prev, loading: true }));

      renderQueue.splice(0, renderQueue.length, () =>
        state.error ? Promise.resolve() : pdfInstance.current.toBlob(),
      );
    };

    const onRenderFailed = error => {
      console.error(error);
      setState(prev => ({ ...prev, loading: false, error }));
    };

    const onRenderSuccessful = blob => {
      setState({
        blob,
        error: null,
        loading: false,
        url: URL.createObjectURL(blob),
      });
    };

    pdfInstance.current = pdf();
    pdfInstance.current.on('change', queueDocumentRender);
    if (document) {
      pdfInstance.current.updateContainer(document);
    }

    renderQueue.on('error', onRenderFailed);
    renderQueue.on('success', onRenderSuccessful);

    return () => {
      renderQueue.end();
      pdfInstance.current.removeListener('change', queueDocumentRender);
    };
  }, []);

  // Revoke old unused url instances
  useEffect(() => {
    return () => {
      if (state.url) {
        URL.revokeObjectURL(state.url);
      }
    };
  }, [state.url]);

  const update = useCallback(newDoc => {
    pdfInstance.current.updateContainer(newDoc);
  }, []);

  return [state, update];
};

export default usePDF;
