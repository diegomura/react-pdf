import { Paragraph } from '../types';

/**
 * Slice block at given height
 *
 * @param height - Height
 * @param paragraph - Paragraph
 * @returns Sliced paragraph
 */
const sliceAtHeight = (height: number, paragraph: Paragraph) => {
  const newBlock = [];

  let counter = 0;

  for (let i = 0; i < paragraph.length; i += 1) {
    const line = paragraph[i];

    counter += line.box.height;

    if (counter < height) {
      newBlock.push(line);
    } else {
      break;
    }
  }

  return newBlock;
};

export default sliceAtHeight;
