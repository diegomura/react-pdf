---
'@react-pdf/layout': minor
'@react-pdf/renderer': minor
'@react-pdf/primitives': minor
'@react-pdf/types': minor
---

Experimental pagination engine, opt-in per page

A new pagination engine ships alongside the current one: content is
measured once and packed into pages instead of relayouting on every split,
making long documents paginate orders of magnitude faster (a 300-page
document drops from ~40s to ~200ms).

Opt in with `<Page experimentalPagination>` — any page opting in switches
the whole document. The default behavior is unchanged.

Under the new engine:

- `<Page layout={Layout}>` renders per-page chrome (headers, footers,
  sidebars) around the content. The layout component receives
  `{ pageNumber, totalPages, subPageNumber, subPageTotalPages }` and the
  page content as `children`, and runs once per output page. Using `layout`
  implies `experimentalPagination`.
- One `fixed` semantic: in-flow fixed elements repeat at the top of every
  page they span; footers are the layout's job.
- `minPresenceAhead` is supported, with one refinement: a trailing element
  with nothing after it stays in place instead of moving to its own page.

The current engine remains the default until the next major, when the new
engine takes over.
