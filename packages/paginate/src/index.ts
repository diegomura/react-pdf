import createPaginator from './paginator';
import { Page, Item } from './types';

const MAX_PAGES = 10_000;

export const paginate = (root: Item, height: number): Page[] => {
  const pages: Page[] = [];
  const paginator = createPaginator(root);

  let safety = 0;

  while (!paginator.done) {
    safety += 1;

    if (safety > MAX_PAGES) {
      throw new Error(
        `[paginate] Exceeded ${MAX_PAGES} pages; likely an infinite loop.`,
      );
    }

    pages.push(paginator.next(height));
  }

  return pages;
};

export { default as createPaginator } from './paginator';
export type { Paginator } from './paginator';

export type {
  Item,
  LeafItem,
  SpacerItem,
  ColumnItem,
  RowItem,
  PenaltyItem,
  LazyItem,
  Ctx,
  PlacedItem,
  Page,
} from './types';
