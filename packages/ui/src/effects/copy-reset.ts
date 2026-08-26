import { atomEffect } from 'jotai-effect';

import copyStateAtom from '../atoms/copy-state';

const RESET_MS = 1500;

const copyResetEffect: ReturnType<typeof atomEffect> = atomEffect(
  (get, set) => {
    const state = get(copyStateAtom);
    if (state === 'idle') return;

    const timer = setTimeout(() => set(copyStateAtom, 'idle'), RESET_MS);

    return () => clearTimeout(timer);
  },
);

export default copyResetEffect;
