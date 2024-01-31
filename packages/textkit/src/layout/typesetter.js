import { isNil } from '@react-pdf/fns';

import copyRect from '../rect/copy';
import cropRect from '../rect/crop';
import blockHeight from '../block/height';
import truncateBlock from '../block/truncate';
import layoutParagraph from './layoutParagraph';
import sliceBlockAtHeight from '../block/sliceAtHeight';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * Layout paragraphs inside container until it does not
 * fit anymore, performing line wrapping in the process.
 *
 * @param {Object} engines engines
 * @param {Object} options layout options
 * @param {Rect} container container rect
 */
export default function typesetter(engines, options, container) {
  /**
   * @param {AttributedString} attributedStrings attributed strings (paragraphs)
   * @returns {Object[]} paragraph blocks
   */
  return (attributedStrings) => {
    const blocks = [];
    const paragraphs = [...attributedStrings];
    const layoutBlock = layoutParagraph(engines, options);
    const maxLines = isNil(container.maxLines) ? Infinity : container.maxLines;
    const truncateEllipsis = container.truncateMode === 'ellipsis';

    let linesCount = maxLines;
    let paragraphRect = copyRect(container);
    let nextParagraph = paragraphs.shift();

    while (linesCount > 0 && nextParagraph) {
      const block = layoutBlock(paragraphRect, nextParagraph);
      const slicedBlock = block.slice(0, linesCount);
      const linesHeight = blockHeight(slicedBlock);

      const shouldTruncate =
        truncateEllipsis && block.length !== slicedBlock.length;

      linesCount -= slicedBlock.length;

      if (paragraphRect.height >= linesHeight) {
        blocks.push(shouldTruncate ? truncateBlock(slicedBlock) : slicedBlock);
        paragraphRect = cropRect(linesHeight, paragraphRect);
        nextParagraph = paragraphs.shift();
      } else {
        blocks.push(
          truncateBlock(sliceBlockAtHeight(paragraphRect.height, slicedBlock)),
        );
        break;
      }
    }

    return blocks;
  };
}
