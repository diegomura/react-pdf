import fill from '../fill/fill';
import toFragments from '../fragment/toFragments';
import toItems from './toItems';
import toPlaced from './toPlaced';
import { FlowNode, PlacedNode } from './types';

export interface Paginator {
  readonly done: boolean;
  next(height: number): PlacedNode[];
}

// Stepwise pagination: each next(height) fills exactly one page, so callers
// can pass a different height per page (a template whose chrome varies).
// Page numbering stays sealed inside; callers own termination. The stream
// is a vertical flow by definition — rows live inside it as containers.
const createPaginator = (nodes: FlowNode[]): Paginator => {
  let pageNumber = 1;
  let fragments = toFragments([toItems(nodes)]);

  return {
    get done() {
      return fragments.length === 0;
    },

    next(height: number): PlacedNode[] {
      if (fragments.length === 0) {
        throw new Error('[paginate] next() called after done');
      }

      // canForce: true. If something doesn't fit even at the top of an empty
      // page, moving it to the next page won't help — place it anyway.
      const result = fill(fragments, height, pageNumber, true);

      pageNumber += 1;
      fragments = result.remaining;

      return toPlaced(result.placed);
    },
  };
};

export default createPaginator;
