/* eslint-disable no-param-reassign */

import resolveImage from '@react-pdf/image';

import resolveSource from './resolveSource';
import NinePatch from './ninePatch';

const getBackgroundSource = (node) => node?.style?.backgroundImage;

/**
 * Fetches image and append data to node
 * Ideally this fn should be immutable.
 *
 * @param {Object} node
 */
const fetchBackgroundImage = async (node) => {
  const src = getBackgroundSource(node);
  const { cache } = node.props;

  if (!src) {
    console.warn(false, 'Node should have backgrounndImage Style set');
    return;
  }

  try {
    const source = await resolveSource(src);
    const ninePatchUtil = new NinePatch();
    const { width, height } = node.box;

    if (!source) {
      throw new Error(`Image's "src" or "source" prop returned ${source}`);
    }

    // resize / scale handle the 9-patch image part.
    const image = await resolveImage(source, { cache });

    const base64Img = `data:image/png;base64, ${encodeURIComponent(image.data.toString('base64'))}`;

    const bgImage = await ninePatchUtil.scaleImage(base64Img, width*2, height*2);

    node.backgroundImage = bgImage;

  } catch (e) {
    node.backgroundImage = { width: 0, height: 0, key: null };
    console.warn(e.message);
  }
};

export default fetchBackgroundImage;
