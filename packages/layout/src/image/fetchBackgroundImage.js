/* eslint-disable no-param-reassign */

import resolveImage from '@react-pdf/image';

// import { createCanvas, loadImage } from "canvas";
import { Canvas, loadImage } from "skia-canvas";

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
    const { no_top = false, no_bottom = false } = node;

    if (!source) {
      throw new Error(`Image's "src" or "source" prop returned ${source}`);
    }

    // resize / scale handle the 9-patch image part.
    const image = await resolveImage(source, { cache });

    const base64Img = `data:image/png;base64, ${encodeURIComponent(image.data.toString('base64'))}`;
    let newHeight = height;
    if (no_top || no_bottom) {
      newHeight = height + 15;
    }

    const bgImage = await ninePatchUtil.scaleImage(decodeURIComponent(base64Img), width*2, newHeight*2);
    if (no_top || no_bottom) {
      const backgroundImage = await loadImage(bgImage);
      // Create a temporary canvas to get the 9Patch index data.
      let cvs, ctx;
      cvs = new Canvas(width*2, height*2);
      ctx = cvs.getContext('2d');
      //crop image top or bottom
      if (no_bottom) {
        ctx.drawImage(backgroundImage, 0, 0, width*2, height*2, 0, 0, width*2, height*2);
      } else if (no_top) {
        ctx.drawImage(backgroundImage, 0, 30, width*2, height*2, 0, 0, width*2, height*2);
      }

      node.backgroundImage = cvs.toDataURL("image/png");
    } else {
      node.backgroundImage = bgImage;
    }

  } catch (e) {
    node.backgroundImage = { width: 0, height: 0, key: null };
    console.warn(e.message);
  }
};

export default fetchBackgroundImage;
