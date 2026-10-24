---
'@react-pdf/stylesheet': patch
---

Fix border shorthands only working in "width style color" order. Width, style and color can now be given in any order, and any of them can be omitted.

Fix numeric border shorthands like `borderBottom: 2` being ignored, which made `borderColor` depend on style order.

Fix `none` and `hidden` border styles not removing the border. Border style keywords are now case-insensitive, and unsupported ones (`double`, `groove`, `ridge`, `inset`, `outset`) resolve to `solid`.
