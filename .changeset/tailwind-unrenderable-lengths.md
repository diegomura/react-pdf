---
'@react-pdf/tailwind': patch
---

Stop emitting lengths react-pdf can't lay out. `w-fit`, `w-min`, `w-max` and their `h-` / `min-` / `max-` / `size-` variants resolved to `fit-content` and friends, `max-w-none` to `none`, and `max-w-prose` to `65ch` — 15 classes that threw `Invalid value fit-content for setWidth` out of Yoga and took down the whole document, plus one that silently became a bare 65pt. Dimension values are now checked against what `@react-pdf/stylesheet` can parse, and anything else is reported as an unsupported class.
