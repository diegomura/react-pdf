import { atom } from 'jotai';

import type { ReplStatus } from '../types';

const statusAtom = atom<ReplStatus>('idle');

export default statusAtom;
