---
'@react-pdf/tailwind': minor
---

Add utilities for react-pdf style properties that had no Tailwind mapping: `aspect-*` (`aspectRatio`), `line-clamp-*` (`maxLines`), `float-*` / `clear-*`, `skew-*`, `size-*`, and the `font-variant-numeric` utilities (`ordinal`, `tabular-nums`, `slashed-zero`, …) via `fontFeatureSettings`. Numeric-variant classes stack rather than overwriting each other.
