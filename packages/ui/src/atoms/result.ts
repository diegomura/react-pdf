import { atom } from 'jotai';

import { render } from '../render/render';
import type { RenderResult } from '../types';
import { swr } from '../utils/swr';

import filesAtom from './files';
import startedAtom from './started';

// Long enough to collapse a burst of typing, short enough to feel live.
const DEBOUNCE_MS = 250;

// Jotai aborts the signal when a dependency changes, so waiting here *is* the
// debounce: a keystroke cancels the pending wait before it reaches the renderer.
const delay = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new Error('superseded'));
    });
  });

const sourceAtom = atom(
  async (get, { signal }): Promise<RenderResult | null> => {
    const files = get(filesAtom);

    // A mutable per-store box, never `set`, so reading it subscribes to nothing.
    const started = get(startedAtom);

    if (files.length === 0) return null;

    // Keyed on "has run", not "has data", so a failed first render does not
    // leave every later keystroke undebounced.
    if (started.value) await delay(DEBOUNCE_MS, signal);
    started.value = true;

    return render(files, { signal });
  },
);

const resultAtom = swr(sourceAtom);

export default resultAtom;
