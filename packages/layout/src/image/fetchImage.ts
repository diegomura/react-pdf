import resolveImage from '@react-pdf/image';

import getSource from './getSource';
import resolveSource from './resolveSource';
import { SafeImageNode } from '../types';

/**
 * Fetches image and append data to node
 * Ideally this fn should be immutable.
 *
 * @param node
 */
const fetchImage = async (node: SafeImageNode) => {
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

    if (Buffer.isBuffer(source) || source instanceof Blob) return;

    node.image.key = 'data' in source ? source.data.toString() : source.uri;
  } catch (e: any) {
    console.warn(e.message);
  }
};

export default fetchImage;
