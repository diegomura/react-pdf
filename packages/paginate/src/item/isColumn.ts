import { ColumnItem, Item } from '../types';

const isColumn = (item: Item): item is ColumnItem => item.kind === 'column';

export default isColumn;
