---
'@react-pdf/tailwind': patch
---

Stop resolving `font-sans` / `font-serif` / `font-mono` against Tailwind's default stacks. They produced families like `-apple-system` and `ui-monospace`, which react-pdf can't draw — every one of them threw `Font family not registered` at render time. `fontFamily` now comes from your config alone, which is what the README already described. Font weight classes are unaffected.
