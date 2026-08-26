---
'@react-pdf/tailwind': minor
---

Add `@react-pdf/tailwind`, a Tailwind CSS to react-pdf style converter. Migrated from [`react-pdf-tailwind`](https://github.com/aanckar/react-pdf-tailwind) by Andreas Anckar, with the author's permission.

On top of the original: breakpoint and orientation variants map onto react-pdf's media queries (`lg:p-4`, `portrait:`), colour opacity is supported wherever a colour is accepted (`bg-red-500/50`, `text-black/25`), and utilities were added for react-pdf style properties that had no Tailwind mapping — `aspect-*`, `line-clamp-*`, `float-*` / `clear-*`, `skew-*`, `size-*`, and the `font-variant-numeric` utilities. Anything react-pdf can't draw — state variants like `hover:`, lengths like `w-fit`, the default `font-sans` stacks — is reported as an unsupported class rather than emitted and crashing layout.
