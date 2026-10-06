import isRepeat from './isRepeat';
import { PlacedItem } from '../types';

// A placement that pins nothing but repeats to the page: the repeat itself,
// or a container part whose entire placed content is repeats.
const isRepeatPlaced = (placed: PlacedItem): boolean =>
  isRepeat(placed.item) ||
  (!!placed.children?.length && placed.children.every(isRepeatPlaced));

export default isRepeatPlaced;
