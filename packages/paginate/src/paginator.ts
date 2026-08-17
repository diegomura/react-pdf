import fill from './fill/fill';
import toFragments from './fragment/toFragments';
import { Item, Page } from './types';

export interface Paginator {
  readonly done: boolean;
  next(height: number): Page;
}

// Stepwise pagination: each next(height) fills exactly one page, so callers
// can pass a different height per page (a template whose chrome varies).
// Fragments and page numbering stay sealed inside; callers own termination.
const createPaginator = (root: Item): Paginator => {
  let pageNumber = 1;
  let fragments = toFragments([root]);

  return {
    get done() {
      return fragments.length === 0;
    },

    next(height: number): Page {
      if (fragments.length === 0) {
        throw new Error('[paginate] next() called after done');
      }

      // canForce: true. If something doesn't fit even at the top of an empty
      // page, moving it to the next page won't help — place it anyway.
      const result = fill(fragments, height, pageNumber, true);

      pageNumber += 1;
      fragments = result.remaining;

      return result.placed;
    },
  };
};

export default createPaginator;
