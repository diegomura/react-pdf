---
"@react-pdf/textkit": minor
---

Custom hyphenation callbacks can now decide for each split point, whether
a hyphen should be inserted at the end of the line when breaking at said
split point.
This change is backwards compatible. If a custom hyphenation callback
returns an array of strings, it is assumed that all except the last part
should get a hyphen added when breaking.
Hyphens can be turned off for all parts of a word by returning an object
in the format:
`{ parts: <string array as previously>, hyphen: null }`
This may be useful for URLs or similar technical identifiers which
should be broken but should not be hyphenated.
Alternatively, the hyphen can be activated or deactivated for each part
separately, by returning an array of part objects:

```
[
  { string: 'blue', hyphen: '-' },
  { string: 'ish-', hyphen: null },
  { string: 'green', hyphen: null }
]
```

For now, only a dash `'-'` or `null` are valid choices for `hyphen`.
Also, for now, the last part of a word is always forced to `hyphen: null`.
Finally, unless specified specifically, parts ending in a dash will not
get an added hyphen, and the default hyphenation will split text on hyphens.
