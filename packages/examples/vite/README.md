<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

> React-pdf examples

## Catalog

| Example              | Description                                                                             | PDF                                                   | Source                                                  |
| -------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------- |
| Duplicated Images    | Same image rendered multiple times (deduplication)                                      | [PDF](./src/examples/duplicated-images/output.pdf)    | [Source](./src/examples/duplicated-images/index.tsx)    |
| Ellipsis             | Text truncation with ellipsis at various widths                                         | [PDF](./src/examples/ellipsis/output.pdf)             | [Source](./src/examples/ellipsis/index.tsx)             |
| Emoji                | Twemoji rendering inline with text                                                      | [PDF](./src/examples/emoji/output.pdf)                | [Source](./src/examples/emoji/index.tsx)                |
| Font Family Fallback | Font fallbacks with mixed families and scripts                                          | [PDF](./src/examples/font-family-fallback/output.pdf) | [Source](./src/examples/font-family-fallback/index.tsx) |
| Font Weight          | Roboto typeface at different weights                                                    | [PDF](./src/examples/font-weight/output.pdf)          | [Source](./src/examples/font-weight/index.tsx)          |
| Forms                | Interactive form components (inputs, checkboxes, selects)                               | [PDF](./src/examples/forms/output.pdf)                | [Source](./src/examples/forms/index.tsx)                |
| Go To                | Internal document navigation with anchor links                                          | [PDF](./src/examples/go-to/output.pdf)                | [Source](./src/examples/go-to/index.tsx)                |
| Image Background     | ImageBackground component with overlaid content                                         | [PDF](./src/examples/image-background/output.pdf)     | [Source](./src/examples/image-background/index.tsx)     |
| JPEG Orientation     | All 8 EXIF orientation values handled correctly                                         | [PDF](./src/examples/jpg-orientation/output.pdf)      | [Source](./src/examples/jpg-orientation/index.tsx)      |
| Knobs                | Slider controls using absolute positioning                                              | [PDF](./src/examples/knobs/output.pdf)                | [Source](./src/examples/knobs/index.tsx)                |
| Link                 | Various link types (text, styled, view, hitSlop)                                        | [PDF](./src/examples/link/output.pdf)                 | [Source](./src/examples/link/index.tsx)                 |
| Math (LaTeX)         | LaTeX math expressions via @react-pdf/math                                              | —                                                     | [Source](./src/examples/math/index.tsx)                 |
| Media Queries        | Responsive layout adapting to page width                                                | [PDF](./src/examples/media-queries/output.pdf)        | [Source](./src/examples/media-queries/index.tsx)        |
| Min Presence Ahead   | Controlling page breaks with minPresenceAhead                                           | [PDF](./src/examples/min-presence-ahead/output.pdf)   | [Source](./src/examples/min-presence-ahead/index.tsx)   |
| Multiline Text       | Inline styling and text wrapping                                                        | [PDF](./src/examples/multiline-text/output.pdf)       | [Source](./src/examples/multiline-text/index.tsx)       |
| Object Fit           | Image contain, cover, and none modes                                                    | [PDF](./src/examples/object-fit/output.pdf)           | [Source](./src/examples/object-fit/index.tsx)           |
| Page Wrap            | Multi-page document with headers and page numbers                                       | [PDF](./src/examples/page-wrap/output.pdf)            | [Source](./src/examples/page-wrap/index.tsx)            |
| Responsive Images    | srcSet-based image selection by page width                                              | [PDF](./src/examples/responsive-images/output.pdf)    | [Source](./src/examples/responsive-images/index.tsx)    |
| Resume               | Multi-section resume with media queries                                                 | [PDF](./src/examples/resume/output.pdf)               | [Source](./src/examples/resume/index.tsx)               |
| World Scripts        | Complex script rendering — Bengali, Tamil, Thai, Arabic, Devanagari, and accented Latin | [PDF](./src/examples/scripts/output.pdf)              | [Source](./src/examples/scripts/index.tsx)              |
| Soft Hyphens         | Automatic word breaking with Unicode soft hyphens                                       | [PDF](./src/examples/soft-hyphens/output.pdf)         | [Source](./src/examples/soft-hyphens/index.tsx)         |
| SVG                  | Paths, gradients, patterns, and complex illustrations                                   | [PDF](./src/examples/svg/output.pdf)                  | [Source](./src/examples/svg/index.tsx)                  |
| SVG Transform        | Random translate and rotate transforms on rectangles                                    | [PDF](./src/examples/svg-transform/output.pdf)        | [Source](./src/examples/svg-transform/index.tsx)        |
| Transform Origin     | All supported transformOrigin values                                                    | [PDF](./src/examples/transform-origin/output.pdf)     | [Source](./src/examples/transform-origin/index.tsx)     |

## Running locally

```bash
# From the repository root
yarn install
yarn build

# Start the dev server
cd packages/examples/vite
yarn dev
```

## Regenerating PDFs

```bash
cd packages/examples/vite
node generate-pdfs.mjs
```

## License

MIT © [Diego Muracciole](http://github.com/diegomura)
