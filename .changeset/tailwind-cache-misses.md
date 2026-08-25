---
'@react-pdf/tailwind': patch
---

Cache unresolved classes. A class react-pdf can't express (`shadow-lg`, `transition`, …) was re-parsed and re-warned on every `tw()` call, so a class string containing one warned once per element rendered and ran ~2x slower.
