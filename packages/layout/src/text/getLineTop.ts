import { Paragraph } from '@react-pdf/textkit';

/**
 * Get Y position of a line at given index.
 * Uses actual line y position when available (float wrapping),
 * otherwise uses cumulative height calculation.
 */
const getLineTop = (lines: Paragraph | undefined, index: number): number => {
  if (!lines?.length || index <= 0) return 0;

  // Use actual y position if available (for float wrapping)
  if (lines[0].box?.y !== undefined) {
    const startY = lines[0].box.y;

    if (index < lines.length) {
      return lines[index].box.y - startY;
    }

    const lastLine = lines[lines.length - 1];
    return lastLine.box.y - startY + lastLine.box.height;
  }

  // Fallback: cumulative height
  let y = 0;
  const limit = Math.min(index, lines.length);

  for (let i = 0; i < limit; i += 1) {
    y += lines[i].box.height;
  }

  return y;
};

export default getLineTop;
