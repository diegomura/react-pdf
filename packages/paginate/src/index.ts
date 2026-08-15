import fill from './fill/fill';
import toFragments from './fragment/toFragments';
import { Page, Item } from './types';

const MAX_PAGES = 10_000;

export const paginate = (root: Item, height: number): Page[] => {
  const pages: Page[] = [];

  let safety = 0;
  let pageNumber = 1;
  let fragments = toFragments([root]);

  while (fragments.length > 0) {
    safety += 1;

    if (safety > MAX_PAGES) {
      throw new Error(
        `[paginate] Exceeded ${MAX_PAGES} pages; likely an infinite loop.`,
      );
    }

    // canForce: true. If something doesn't fit even at the top of an empty
    // page, moving it to the next page won't help — place it anyway.
    const result = fill(fragments, height, pageNumber, true);

    pages.push(result.placed);

    pageNumber += 1;

    fragments = result.remaining;
  }

  return pages;
};

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
