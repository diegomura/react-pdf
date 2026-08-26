import { atomEffect } from 'jotai-effect';

import blobAtom from '../atoms/blob';
import urlAtom from '../atoms/url';

const objectUrlEffect: ReturnType<typeof atomEffect> = atomEffect(
  (get, set) => {
    const blob = get(blobAtom);
    if (!blob) return;

    const url = URL.createObjectURL(blob);
    set(urlAtom, url);

    // The next run overwrites urlAtom, so cleanup only has to release the
    // handle. On unmount the store goes with it.
    return () => URL.revokeObjectURL(url);
  },
);

export default objectUrlEffect;
