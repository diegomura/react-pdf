/* eslint-disable no-console */

import queue from 'queue';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const useQueue = () => {
  const queueRef = useRef(null);

  const [state, setState] = useState({
    value: null,
    error: null,
    loading: false,
  });

  // Setup rendering queue
  useEffect(() => {
    queueRef.current = queue({ autostart: true, concurrency: 1 });

    const onRenderFailed = error => {
      console.error(error);
      setState(prev => ({ ...prev, error }));
    };

    const onRenderSuccessful = value => {
      setState({
        value,
        error: null,
        loading: false,
      });
    };

    queueRef.current.on('error', onRenderFailed);
    queueRef.current.on('success', onRenderSuccessful);

    return () => {
      queueRef.current.end();
    };
  }, []);

  const add = useCallback(job => {
    setState(prev => ({ ...prev, loading: true }));

    queueRef.current.splice(0, queueRef.current.length, () =>
      state.error ? Promise.resolve() : job(),
    );
  }, []);

  return useMemo(() => ({ ...state, add }), [state, add]);
};

export default useQueue;
