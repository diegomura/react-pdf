---
"@react-pdf/renderer": minor
"@react-pdf/layout": minor
---

feat: expose `hyphenationPenalty` on `Text` props

The `hyphenationPenalty` layout option was already honoured at runtime but
was missing from the public `TextProps` types. Consumers can work around this
with type-casting or type augmentation, but surfacing this prop removes the
need for consumers to handle this in undefined ways. Setting this to `Infinity`
disables automatic hyphenation for a given text block.
