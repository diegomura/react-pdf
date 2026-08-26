---
'@react-pdf/tailwind': patch
---

Stop a theme colour from winning on properties that can't hold one. The colour lookup runs ahead of the scale lookup so `border-red-500` can be told from `border-2`, but that also meant a custom colour sharing a name with a spacing or radius key resolved there too — `colors: { card: '#fff' }` alongside `spacing: { card: 12 }` made `p-card` emit `padding: '#fff'`, which react-pdf rejects. Dimensions and border radii now skip the colour lookup; `bg-*`, `text-*` and `border-*` are unaffected.
