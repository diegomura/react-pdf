/* eslint-disable no-param-reassign */

import resolveImage from '@react-pdf/image';

import getSource from './getSource';
import resolveSource from './resolveSource';

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
    console.warn(false, 'Image should receive either a "src" or "source" prop');
    return;
  }

  try {
    const source = await resolveSource(src);
    node.image = await resolveImage(source, { cache });
  } catch (e) {
    node.image = { width: 0, height: 0 };
    console.warn(e.message);
  }
};

export default fetchImage;
