---
'@react-pdf/textkit': minor
'@react-pdf/font': minor
'@react-pdf/types': minor
---

Hyphenation callbacks can now decide, per split point, whether a hyphen is added when a line breaks there. Return `{ parts, hyphen: null }` to break a word without hyphens, or an array of `{ string, hyphen }` parts to decide part by part. Plain string arrays keep working as before.

Chinese and Japanese text now breaks between ideographs by default, without hyphens. Parts ending in `-` no longer get a second hyphen, and the built-in hyphenation can break after dashes in compound words.
