import { isNil, matchPercent } from '@react-pdf/fns';
import { Origin, SafeNode } from '../types';

const getTransformStyle =
  (s: 'transformOriginX' | 'transformOriginY') => (node: SafeNode) =>
    isNil(node.style?.[s]) ? '50%' : node.style?.[s] ?? null;

/**
 * Get node origin
 *
 * @param node
 * @returns {{ left?: number, top?: number }} node origin
 */
const getOrigin = (node: SafeNode): Origin | null => {
  if (!node.box) return null;

  const { left, top, width, height } = node.box;
  const transformOriginX = getTransformStyle('transformOriginX')(node);
  const transformOriginY = getTransformStyle('transformOriginY')(node);

  const percentX = matchPercent(transformOriginX);
  const percentY = matchPercent(transformOriginY);

  const offsetX = percentX ? width * percentX.percent : transformOriginX;
  const offsetY = percentY ? height * percentY.percent : transformOriginY;

  if (isNil(offsetX) || typeof offsetX === 'string')
    throw new Error(`Invalid origin offsetX: ${offsetX}`);

  if (isNil(offsetY) || typeof offsetY === 'string')
    throw new Error(`Invalid origin offsetY: ${offsetY}`);

  return { left: left + offsetX, top: top + offsetY };
};

export default getOrigin;
