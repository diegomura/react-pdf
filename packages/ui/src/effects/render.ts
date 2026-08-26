import { atomEffect } from 'jotai-effect';

import blobAtom from '../atoms/blob';
import debounceAtom from '../atoms/debounce';
import errorAtom from '../atoms/error';
import filesAtom from '../atoms/files';
import renderFnAtom from '../atoms/render-fn';
import startedAtom from '../atoms/started';
import statusAtom from '../atoms/status';

const toError = (value: unknown) =>
  value instanceof Error ? value : new Error(String(value));

const renderEffect: ReturnType<typeof atomEffect> = atomEffect((get, set) => {
  const files = get(filesAtom);
  const debounce = get(debounceAtom);

  // Both are per-store boxes, read for identity and never `set`, so neither
  // subscribes this effect to its own bookkeeping.
  const renderFn = get(renderFnAtom);
  const started = get(startedAtom);

  const render = renderFn.current;

  if (!render || files.length === 0) {
    set(statusAtom, 'idle');
    return;
  }

  let stale = false;
  const controller = new AbortController();

  const run = () => {
    set(statusAtom, 'rendering');

    Promise.resolve()
      .then(() => render(files, { signal: controller.signal }))
      .then((blob) => {
        if (stale) return;
        set(blobAtom, blob);
        set(errorAtom, null);
        set(statusAtom, 'ready');
      })
      .catch((error: unknown) => {
        if (stale) return;
        // the last good blob stays put, so a consumer keeps showing it
        set(errorAtom, toError(error));
        set(statusAtom, 'error');
      });
  };

  const cleanup = () => {
    stale = true;
    controller.abort();
  };

  if (!started.value) {
    started.value = true;
    run();
    return cleanup;
  }

  const timer = setTimeout(run, debounce);

  return () => {
    clearTimeout(timer);
    cleanup();
  };
});

export default renderEffect;
