---
"@react-pdf/pdfkit": minor
"@react-pdf/textkit": minor
---

Fix and rework the hyphenation algorithm, and allow custom word hyphenation algorithms to specify whether a hyphen should be inserted in case the word is wrapped.

**Caution**: If you have been using a custom hyphenation callback - which hasn't been working properly since at least version 2.0.21 - then you will need to change your implementation to leave a soft hyphen character (`'\u00AD'`) at the end of syllables where you want react-pdf to insert a hyphen when wrapping lines. Syllables without a final soft hyphen character will still be able to break, but will not produce a hyphen character at the end of the line.

This allows you to break correctly on normal hyphens or other special characters in your text. For example, to use the default english-language syllable breaking built into react-pdf, but also break after hyphens naturally occurring in your text (such as is often present in hyperlinks), you could use the following hyphenation callback:
```js
import { Font } from '@react-pdf/renderer';

Font.registerHyphenationCallback((word, originalHyphenationCallback) => {
  return originalHyphenationCallback(word).flatMap(w => w.split(/(?<=-)/))
})
```
(`flatMap` requires at least ES2019)
