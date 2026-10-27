import { Item, RowItem } from '../types';

const isRow = (item: Item): item is RowItem => item.kind === 'row';

export default isRow;
