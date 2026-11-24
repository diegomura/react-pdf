---
'@react-pdf/font': patch
'@react-pdf/textkit': patch
'@react-pdf/layout': patch
---

fix: declare the packages imported by published type declarations as dependencies (`@types/fontkit` in font and textkit, `@react-pdf/font` in textkit and layout), so they type-check with `skipLibCheck: false`
