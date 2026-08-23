---
'@react-pdf/layout': major
'@react-pdf/renderer': major
'@react-pdf/primitives': minor
'@react-pdf/types': minor
---

New pagination engine and Page `layout` prop

Pagination is handled by `@react-pdf/paginate`: content is measured once and
packed into pages, instead of relayouting on every split. Large documents
paginate orders of magnitude faster.

`<Page layout={Layout}>` renders per-page chrome (headers, footers,
sidebars) around the content. The layout component receives
`{ pageNumber, totalPages, subPageNumber, subPageTotalPages }` and the page
content as `children`, and runs once per output page.

**Breaking:**

- One `fixed` semantic: in-flow fixed elements repeat at the top of every
  page they span. Suffix fixed elements no longer reserve footer space —
  use `layout` for footers.
- Flex justify at the page root follows the content stream across pages.
- `minPresenceAhead` is not supported by the new engine.

Adds the `Fragment` primitive, the instance pass-through used when the
renderer invokes page layouts.
