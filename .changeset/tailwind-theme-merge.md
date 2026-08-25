---
'@react-pdf/tailwind': patch
---

Fix theme config being partially ignored. Overriding a key that already exists in a default scale did nothing (`createTw({ spacing: { 4: '100rem' } })` left `p-4` at its default), and overriding one shade of a color replaced the whole ramp (`colors: { gray: { 500: '#fff' } }` broke `bg-gray-100`). Scales now merge one level deep and theme functions resolve against the merged theme. `fontFamily` still replaces, since react-pdf can only draw registered fonts.

Also fixes `font-sans` resolving to `NaN` — `-apple-system` ends in `em`, which the unit conversion read as a length — and `group-hover:p-4` failing while `peer-focus:p-4` worked, caused by the value being split off the un-stripped class name.
