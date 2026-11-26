import isLeaf from './isLeaf';
import { Item, SplittableLeaf } from '../types';

const canSplit = (item: Item): item is SplittableLeaf =>
  isLeaf(item) && item.split !== undefined;

export default canSplit;
