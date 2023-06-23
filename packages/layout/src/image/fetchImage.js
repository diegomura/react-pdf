/* eslint-disable no-param-reassign */

import resolveImage from '@nutshelllabs/image';

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

    if (!source) {
      throw new Error(`Image's "src" or "source" prop returned ${source}`);
    }

    node.image = await resolveImage(source, { cache });
    node.image.key = source.data ? source.data.toString() : source.uri;
  } catch (e) {
    node.image = { width: 0, height: 0, key: null };
    console.warn(e.message);
  }
};

export default fetchImage;
