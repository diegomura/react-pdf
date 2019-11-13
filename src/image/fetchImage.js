import resolveImage from './resolveImage';
import getSource from './getSource';
import warning from '../utils/warning';

/**
 * Resolves async src if passed
 *
 * @param {string | Function} src
 * @returns {object} resolved src
 */
const resolveSrc = async src =>
  typeof src === 'function' ? { uri: await src() } : src;

/**
 * Fetches image and append data to node
 * Ideally this fn should be immutable.
 *
 * @param {Object} node
 */
const fetchImage = async node => {
  const src = getSource(node);
  const { cache } = node.props;

  if (!src) {
    warning(false, 'Image should receive either a "src" or "source" prop');
    return;
  }

  try {
    const source = await resolveSrc(src);
    node.image = await resolveImage(source, { cache });
  } catch (e) {
    node.image = { width: 0, height: 0 };
    console.warn(e.message);
  }
};

export default fetchImage;
