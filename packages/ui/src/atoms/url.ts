import { atom } from 'jotai';
import { withAtomEffect } from 'jotai-effect';

import blobAtom from './blob';

const url = atom<string | null>(null);

/**
 * An effect rather than a computed atom: `createObjectURL` needs a paired
 * revoke, and a read function has no cleanup hook. Mounting it also drives the
 * pipeline, since the blob it reads is the rendered result.
 */
const urlAtom = withAtomEffect(url, (get, set) => {
  const blob = get(blobAtom);
  if (!blob) return undefined;

  const objectUrl = URL.createObjectURL(blob);
  set(url, objectUrl);

  // The next run overwrites the value, so cleanup only releases the handle.
  return () => URL.revokeObjectURL(objectUrl);
});

export default urlAtom;
