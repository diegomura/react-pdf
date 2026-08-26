<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/tailwind

Use Tailwind CSS to style PDFs created with react-pdf. Converts a compatible subset of the Tailwind class syntax into style objects that `@react-pdf/renderer` understands.

Originally published as [`react-pdf-tailwind`](https://github.com/aanckar/react-pdf-tailwind) by [Andreas Anckar](https://github.com/aanckar), donated to the react-pdf monorepo and maintained here since.

## Installation

```bash
yarn add @react-pdf/tailwind
```

## Usage

```jsx
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { createTw } from '@react-pdf/tailwind';

// Apply your own styles on top of Tailwind defaults
const tw = createTw({
  fontFamily: {
    sans: ['Papyrus'],
  },
  colors: {
    custom: '#bada55',
  },
});

export default function MyPdf() {
  return (
    <Document>
      <Page size="A4" style={tw('p-12 font-sans')}>
        <View style={tw('p-20 bg-gray-100')}>
          <Text style={tw('text-custom text-3xl')}>Section #1</Text>
        </View>
        <View style={tw('mt-12 px-8 rotate-2')}>
          <Text style={tw('text-amber-600 text-2xl')}>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
}
```

### createTw(config, options)

`config` is a theme object merged into Tailwind's `defaultTheme`. It follows the Tailwind v4 theme shape — see [Tailwind's default theme](https://github.com/tailwindlabs/tailwindcss/blob/main/packages/tailwindcss/src/compat/default-theme.ts) for reference.

```js
const tw = createTw(
  {
    fontFamily: {
      sans: ['Papyrus'],
    },
    spacing: {
      verybig: '999rem',
    },
    colors: {
      custom: '#bada55',
    },
  },
  {
    // Base font size in points. Defaults to 12.
    ptPerRem: 12,
  },
);
```

Scales merge one level deep, so overriding a single key keeps the rest of the default scale — `spacing: { 4: '2rem' }` changes `p-4` while leaving `p-8` alone, and `colors: { gray: { 500: '#fff' } }` leaves the other grays intact. Replace a whole scale by overriding it with a non-object value.

`fontFamily` is the exception: it comes from your config alone, neither merging with Tailwind's defaults nor falling back to them. react-pdf can only draw [fonts you have registered](https://react-pdf.org/fonts), and Tailwind's stacks name web families like `-apple-system`, so resolving `font-sans` against them would throw at render time. Register a font, map it in the config, and `font-<key>` works; without a config, `font-sans` / `font-serif` / `font-mono` warn as unsupported while `font-bold` and friends still resolve.

### Color opacity

`bg-red-500/50` and friends work anywhere a colour does — `bg-`, `text-`, `border-`, `decoration-` — including black, white, custom and arbitrary colours:

```js
tw('bg-red-500/50'); // { backgroundColor: '#ef444480' }
tw('text-black/25'); // { color: '#00000040' }
tw('bg-[#bada55]/60'); // { backgroundColor: '#bada5599' }
```

A bare suffix is a percentage; a bracketed one is `0`–`1` unless it carries a `%`, so `/[0.55]` and `/[55%]` agree. `transparent`, `currentColor` and `inherit` name no channel to modulate and reject the suffix.

### Variants

Breakpoint and orientation variants become react-pdf media queries, which resolve against the **page box** rather than a viewport:

```js
tw('p-2 lg:p-4 landscape:p-6');
// {
//   padding: 6,
//   '@media min-width: 768': { padding: 12 },
//   '@media orientation: landscape': { padding: 18 },
// }
```

| Variant                        | Becomes                 |
| ------------------------------ | ----------------------- |
| `sm:` `md:` `lg:` `xl:` `2xl:` | `@media min-width: N`   |
| `max-sm:` … `max-2xl:`         | `@media max-width: N`   |
| `min-[600px]:` `max-[40rem]:`  | the width you give it   |
| `portrait:` `landscape:`       | `@media orientation: …` |
| stacked, e.g. `lg:portrait:`   | both, joined with `and` |

Tailwind v4 states its breakpoints in rem, so at the default `1rem = 12pt` they land at page scale: `sm` is 480pt, `md` 576pt, `lg` 768pt, `xl` 960pt. An A4 page is 595pt wide upright and 842pt on its side, so `md` matches portrait and `lg` matches landscape. Set `screens` in the config to choose your own.

State variants — `hover:`, `focus:`, `dark:`, `group-*`, `peer-*` — describe something a printed page never enters, and are reported as unsupported rather than applied. Applying them would bake the hover style into the output.

The returned `tw` function takes a space-separated class string and returns a react-pdf `Style` object. Unknown classes are skipped with a console warning, emitted once per distinct class.

## Notes

- Supports the CSS properties that make sense in a PDF context and are supported by react-pdf — see [valid CSS properties](https://react-pdf.org/styling#valid-css-properties).
- Uses `pt` as the internal unit ([valid units](https://react-pdf.org/styling#valid-units)), with `1rem = 12pt` by default. Change it with `ptPerRem`.
- react-pdf uses [Yoga](https://yogalayout.dev/) for layout, so some defaults differ from the web — `flex-direction` defaults to `column`, for example. Add `flex-row` where you need it.
- Line heights are emitted unitless, since react-pdf only supports unitless `lineHeight`.
- `aspect-auto` and `line-clamp-none` warn as unsupported. react-pdf has no style value meaning "no aspect ratio" or "no clamp" — leaving the utility off is the reset.
- Intrinsic sizing (`w-fit`, `h-min`, `max-w-max`, …), `max-w-none` / `max-h-none`, and lengths in units react-pdf can't parse (`max-w-prose` is `65ch`) warn as unsupported. Yoga has no equivalent, and passing the value through would throw while laying out the document.
- `float-*` and `clear-*` map to react-pdf's float support, which is newer and has rough edges: setting `lineHeight` on floated content breaks text wrap, and parents don't grow to contain their floats.

## License

MIT
