---
'@react-pdf/paginate': major
---

Box-model public API: FlowNode in, PlacedNode out

`createPaginator(nodes: FlowNode[])` now takes a tree of boxes — tops,
heights, margins, edges — and derives gaps, edge spacers, and row offsets
internally. The item stream (leaf/spacer/column/row/penalty/lazy) becomes an
implementation detail; `paginate` and the Item types are no longer exported.
Output is `PlacedNode[]`: placed fragments in the caller's vocabulary, with
spacers and synthetic wrappers dissolved into positions.

Also: columns whose children overlap vertically (flex-wrap) are now demoted
to unsplittable leaves by the engine itself.
