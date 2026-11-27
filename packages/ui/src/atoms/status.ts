import { atom } from 'jotai';

import type { PlaygroundStatus } from '../types';

import resultAtom from './result';

const statusAtom = atom((get): PlaygroundStatus => {
  const { data, pending, error } = get(resultAtom);

  if (pending) return 'rendering';
  if (error) return 'error';

  // null is the renderer declining to run at all: no files, or no render fn
  return data === null ? 'idle' : 'ready';
});

export default statusAtom;
