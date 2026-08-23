# @react-pdf/paginate

## 1.0.0

### Major Changes

- [#3501](https://github.com/diegomura/react-pdf/pull/3501) [`cf1348df7bfbc8091ff495320a3ae798569ccc4e`](https://github.com/diegomura/react-pdf/commit/cf1348df7bfbc8091ff495320a3ae798569ccc4e) Thanks [@diegomura](https://github.com/diegomura)! - Box-model public API: FlowNode in, PlacedNode out

  `createPaginator(nodes: FlowNode[])` now takes a tree of boxes — tops,
  heights, margins, edges — and derives gaps, edge spacers, and row offsets
  internally. The item stream (leaf/spacer/column/row/penalty/lazy) becomes an
  implementation detail; `paginate` and the Item types are no longer exported.
  Output is `PlacedNode[]`: placed fragments in the caller's vocabulary, with
  spacers and synthetic wrappers dissolved into positions.

  Also: columns whose children overlap vertically (flex-wrap) are now demoted
  to unsplittable leaves by the engine itself.

### Minor Changes

- [#3497](https://github.com/diegomura/react-pdf/pull/3497) [`482d7cd600ffa28c60b5db46e7eb1466398feb7b`](https://github.com/diegomura/react-pdf/commit/482d7cd600ffa28c60b5db46e7eb1466398feb7b) Thanks [@diegomura](https://github.com/diegomura)! - Add `repeat` flag — items re-emit at the head of every continuation of their parent column (repeating table headers), composing with lazy items to re-materialize per page. Add `createPaginator` for stepwise pagination with a different height per page.
