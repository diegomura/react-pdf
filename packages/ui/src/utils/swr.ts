import { atom, type Atom } from 'jotai';
import { unwrap } from 'jotai/utils';

// `unique symbol` so the `value === PENDING` check below narrows; a plain
// `symbol` widens and defeats it.
const PENDING: unique symbol = Symbol('pending');

export type Swr<Value> = {
  data: Value | undefined;
  pending: boolean;
  error: unknown;
};

/**
 * Stale-while-revalidate for an async atom: the last resolved value survives
 * the next pending phase *and* a rejection, so consumers never blank out.
 * The cache is a per-store box, written during read but idempotently.
 */
export function swr<Value>(source: Atom<Promise<Value>>): Atom<Swr<Value>> {
  const cache = atom(() => ({ current: undefined as Value | undefined }));
  const unwrapped = unwrap(source, () => PENDING);

  return atom((get): Swr<Value> => {
    const box = get(cache);

    try {
      // `unwrap` widens to `Awaited<Value>`, which TS cannot prove equals
      // `Value` for an unconstrained generic. It does here: the source always
      // resolves to a non-promise.
      const value = get(unwrapped) as Value | typeof PENDING;
      if (value === PENDING)
        return { data: box.current, pending: true, error: null };

      box.current = value;
      return { data: value, pending: false, error: null };
    } catch (error) {
      return { data: box.current, pending: false, error };
    }
  });
}
