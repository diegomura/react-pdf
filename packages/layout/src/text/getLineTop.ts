import { Paragraph } from '@react-pdf/textkit';

/**
 * Get Y position of a line at given index, relative to the first line.
 * Reads actual line positions so gaps from float exclusion count.
 */
const getLineTop = (lines: Paragraph | undefined, index: number): number => {
  if (!lines?.length || index <= 0) return 0;

  const startY = lines[0].box.y;

  if (index < lines.length) {
    return lines[index].box.y - startY;
  }

  const lastLine = lines[lines.length - 1];
  return lastLine.box.y - startY + lastLine.box.height;
};

export default getLineTop;
