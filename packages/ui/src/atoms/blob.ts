import { atom } from 'jotai';

import resultAtom from './result';

const blobAtom = atom((get) => get(resultAtom).data?.blob ?? null);

export default blobAtom;
