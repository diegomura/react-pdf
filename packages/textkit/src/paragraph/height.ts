import { Paragraph } from '../types';

/**
 * Get paragraph block height
 *
 * @param paragraph - Paragraph
 * @returns Paragraph block height
 */
const height = (paragraph: Paragraph) => {
  return paragraph.reduce((acc, block) => acc + block.box.height, 0);
};

export default height;
