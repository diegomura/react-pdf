import isRow from '../item/isRow';
import isColumn from '../item/isColumn';
import { Fragment, Item } from '../types';

const toFragments = (items: Item[]): Fragment[] =>
  items.map(
    (item): Fragment => ({
      item,
      isFirst: true,
      children: isRow(item) || isColumn(item) ? toFragments(item.children) : [],
    }),
  );

export default toFragments;
