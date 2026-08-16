---
'@react-pdf/paginate': minor
---

Items accept an opaque `data` payload the engine hands back untouched on placements, and every `PlacedItem` reports the vertical space it occupied — a fragment that continues onto the next page occupies everything it was given, so consumers can draw split containers to the page edge without measuring. Also removes the never-populated `Ctx.totalPages`.
