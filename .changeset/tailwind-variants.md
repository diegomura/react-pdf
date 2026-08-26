---
'@react-pdf/tailwind': minor
---

Map breakpoint and orientation variants onto react-pdf's media queries. `lg:p-4` now becomes `{ '@media min-width: 768': { padding: 12 } }`, resolved against the page box, and `portrait:` / `landscape:` map to `@media orientation`. Stacked variants join with `and`, and classes sharing a query merge into one block.

State variants (`hover:`, `focus:`, `dark:`, `group-*`, `peer-*`) are now reported as unsupported instead of having the variant stripped and the base utility applied unconditionally — `hover:bg-red-500` used to paint the background red in the output.
