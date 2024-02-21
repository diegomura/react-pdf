/**
 * Resolves `src` to `@react-pdf/image` interface.
 *
 * Also it handles factories and async sources.
 *
 * @param {string | Object | Function} src
 * @returns {Promise<Object>} resolved src
 */
const resolveSource = async (src) => {
  const source = typeof src === 'function' ? await src() : await src;
  return typeof source === 'string' ? { uri: source } : source;
};

export default resolveSource;
