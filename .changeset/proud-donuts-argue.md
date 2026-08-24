---
'@react-pdf/textkit': patch
'@react-pdf/font': patch
---

perf: drop the omit('font') preprocessing pass, skip attachment purging when no attachment is set, reduce allocations in the Knuth-Plass main loop, and cache standard font AFM glyph-name lookups
