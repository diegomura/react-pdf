import { atom } from 'jotai';

import type { RenderFn } from '../types';

// A read-only atom with no dependencies is computed once per store, so each
// Provider gets its own box. `atom({ ... })` would share one object across
// every Repl on the page. Mutated rather than `set`, so a consumer passing an
// inline arrow does not re-trigger the render effect on every React render.
const renderFnAtom = atom(() => ({ current: null as RenderFn | null }));

export default renderFnAtom;
