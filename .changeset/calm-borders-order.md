---
'@react-pdf/stylesheet': patch
---

Fix border shorthands only working in "width style color" order. Width, style and color can now be given in any order, and any of them can be omitted.

Fix numeric border shorthands like `borderBottom: 2` being ignored, which made `borderColor` depend on style order.

In border shorthands like `border` and `borderTop`, `none` and `hidden` now remove the border, style keywords are case-insensitive, and unsupported styles (`double`, `groove`, `ridge`, `inset`, `outset`) resolve to `solid`.
