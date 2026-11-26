---
'@react-pdf/textkit': minor
'@react-pdf/font': minor
'@react-pdf/types': minor
---

Hyphenation callbacks can now decide, per split point, whether a hyphen is added when a line breaks there. Return `{ string, hyphen: null }` parts instead of strings to break without a hyphen; strings and parts can be mixed. Plain string arrays keep working as before.

Chinese and Japanese text now breaks between ideographs by default, without hyphens. Breaks without a hyphen now cost the same as breaking at a space and are no longer blocked by `hyphenationPenalty`. Parts ending in `-` no longer get a second hyphen, and the built-in hyphenation can break after dashes in compound words.
