import { Item, LeafItem, SpacerItem } from '../types';

// Spacers behave exactly like leaves everywhere in the engine; the separate
// kind only exists so consumers can tell spacing apart from content.
const isLeaf = (item: Item): item is LeafItem | SpacerItem =>
  item.kind === 'leaf' || item.kind === 'spacer';

export default isLeaf;
