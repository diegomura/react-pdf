import { isNil } from '@react-pdf/fns';

import copyRect from '../rect/copy';
import cropRect from '../rect/crop';
import blockHeight from '../block/height';
import truncateBlock from '../block/truncate';
import layoutParagraph from './layoutParagraph';
import sliceBlockAtHeight from '../block/sliceAtHeight';

/**
 * Layout paragraphs inside container until it does not
 * fit anymore, performing line wrapping in the process.
 *
 * @param  {Object}  engines
 * @param  {Object}  layout options
 * @param  {Object}  container rect
 * @param  {Object}  attributed strings (paragraphs)
 * @return {Array} paragraph blocks
 */
const typesetter = (engines, options, container) => attributedStrings => {
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

export default typesetter;
