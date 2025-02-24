import { SourceObject } from '../types';

/**
 * Resolves `src` to `@react-pdf/image` interface.
 *
 * Also it handles factories and async sources.
 *
 * @param src
 * @returns Resolved src
 */
const resolveSource = async (src: SourceObject) => {
  const source = typeof src === 'function' ? await src() : await src;
  return typeof source === 'string' ? { uri: source } : source;
};

export default resolveSource;
