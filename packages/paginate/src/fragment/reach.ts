import { PlacedItem } from '../types';

// How far down a set of placements reached. Not the same as the state's
// usedHeight, which still counts items a rewind took back off the page.
const reach = (placed: PlacedItem[]) =>
  placed.reduce((acc, item) => Math.max(acc, item.y + item.height), 0);

export default reach;
