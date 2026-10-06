---
"@react-pdf/vite-example": minor
"@react-pdf/stylesheet": minor
"@react-pdf/textkit": minor
"@react-pdf/layout": minor
---

feat: support `text-wrap` style on Text with `pretty`, `balance`, and `nowrap` values.
`pretty` avoids single-word last lines (word-level orphan control). 
`balance` equalizes line lengths for short headings (capped at 10 lines).
`nowrap` keeps the entire paragraph on a single line.
