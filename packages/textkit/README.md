<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/textkit

## Acknowledges

This project is a fork of [textkit](https://github.com/foliojs/textkit) by @devongovett and continued under the scope of this project since it has react-pdf specific features. Any recongnition should go to him and the original project mantainers.

## Layout process

1. split into paragraphs
2. get bidi runs and paragraph direction
3. font substitution - map to resolved font runs
4. script itemization
5. font shaping - text to glyphs
6. line breaking
7. bidi reordering
8. justification
9. get a list of rectangles by intersecting path, line, and exclusion paths
10. perform line breaking to get acceptable break points for each fragment
11. ellipsize line if necessary
12. bidi reordering
13. justification
