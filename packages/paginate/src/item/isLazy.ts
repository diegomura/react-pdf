import { Item, LazyItem } from '../types';

const isLazy = (item: Item): item is LazyItem => item.kind === 'lazy';

export default isLazy;
