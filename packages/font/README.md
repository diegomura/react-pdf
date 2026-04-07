<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/font

Font registration, loading, and resolution library for react-pdf. Handles TTF, WOFF, and WOFF2 fonts from various sources including local files, remote URLs, and base64 data URIs. Includes built-in support for PDF standard fonts.

## Installation

```bash
yarn add @react-pdf/font
```

## Usage

```js
import FontStore from '@react-pdf/font';

const fontStore = new FontStore();

// Register a custom font
fontStore.register({
  family: 'Roboto',
  src: 'https://example.com/fonts/Roboto-Regular.ttf',
});

// Load the font
await fontStore.load({
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 400,
});
```

## Font Sources

The library supports multiple font source types:

### Remote URL

```js
fontStore.register({
  family: 'Open Sans',
  src: 'https://example.com/fonts/OpenSans-Regular.ttf',
});
```

With custom request options:

```js
fontStore.register({
  family: 'Open Sans',
  src: 'https://example.com/fonts/OpenSans-Regular.ttf',
  method: 'GET',
  headers: {
    Authorization: 'Bearer token',
  },
  body: null,
});
```

### Local File (Node.js)

```js
fontStore.register({
  family: 'Custom Font',
  src: '/path/to/font.ttf',
});
```

> **Note:** Local file resolution is only available in Node.js environments.

### Base64 Data URI

```js
fontStore.register({
  family: 'Embedded Font',
  src: 'data:font/ttf;base64,AAEAAAALAIAAAwAwT1MvMg...',
});
```

## Registering Font Families

### Single Font

```js
fontStore.register({
  family: 'Roboto',
  src: 'https://example.com/fonts/Roboto-Regular.ttf',
  fontWeight: 400,
  fontStyle: 'normal',
});
```

### Multiple Weights and Styles (Bulk Registration)

```js
fontStore.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://example.com/fonts/Roboto-Regular.ttf', fontWeight: 400 },
    { src: 'https://example.com/fonts/Roboto-Bold.ttf', fontWeight: 700 },
    {
      src: 'https://example.com/fonts/Roboto-Italic.ttf',
      fontWeight: 400,
      fontStyle: 'italic',
    },
    {
      src: 'https://example.com/fonts/Roboto-BoldItalic.ttf',
      fontWeight: 700,
      fontStyle: 'italic',
    },
  ],
});
```

## Standard Fonts

The following PDF standard fonts are pre-registered and available without any additional setup:

- **Helvetica** (with Bold, Oblique, and BoldOblique variants)
- **Courier** (with Bold, Oblique, and BoldOblique variants)
- **Times-Roman** (with Bold, Italic, and BoldItalic variants)

Helvetica variants are pre-loaded by default, so no explicit `load()` call is needed for them.

```js
// Standard fonts are ready to use immediately
const font = fontStore.getFont({
  fontFamily: 'Helvetica',
  fontWeight: 700,
  fontStyle: 'normal',
});
```

## Font Weight Resolution

The library implements CSS font-weight resolution rules. You can specify font weights as numbers or keywords:

| Keyword                    | Numeric Value |
| -------------------------- | ------------- |
| `thin`, `hairline`         | 100           |
| `ultralight`, `extralight` | 200           |
| `light`                    | 300           |
| `normal`                   | 400           |
| `medium`                   | 500           |
| `semibold`, `demibold`     | 600           |
| `bold`                     | 700           |
| `ultrabold`, `extrabold`   | 800           |
| `heavy`, `black`           | 900           |

When an exact weight match isn't available, the library uses CSS fallback rules to find the closest available weight.

## Emoji Support

Register an emoji source to enable emoji rendering:

```js
// Using a URL pattern (must end with trailing slash)
fontStore.registerEmojiSource({
  url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
  format: 'png',
});

// Using a custom builder function
fontStore.registerEmojiSource({
  builder: (code) => `https://example.com/emojis/${code}.png`,
});
```

The `code` parameter passed to the builder is a hyphen-separated string of hex code points (e.g., `1f44d` for 👍 or `1f44d-1f3ff` for 👍🏿).

Set `withVariationSelectors: true` if your emoji source requires variation selectors in the code points.

## Hyphenation

Register a hyphenation callback for text wrapping:

```js
import hyphenationCallback from 'hyphen/en';

fontStore.registerHyphenationCallback(hyphenationCallback);
```

## API Reference

### FontStore

#### `register(data: SingleLoad | BulkLoad)`

Register a font or font family.

#### `load(descriptor: FontDescriptor): Promise<void>`

Load a specific font variant.

#### `getFont(descriptor: FontDescriptor): FontSource`

Get a font source matching the descriptor.

#### `registerEmojiSource(source: EmojiSource)`

Register an emoji image source.

#### `registerHyphenationCallback(callback: HyphenationCallback)`

Register a hyphenation callback function.

#### `reset()`

Reset all loaded font data (keeps registrations).

#### `clear()`

Clear all font registrations, emoji source, and hyphenation callback.

#### `getRegisteredFontFamilies(): string[]`

Get list of registered font family names.

#### `getRegisteredFonts(): Record<string, FontFamily>`

Get all registered font families with their sources.

#### `getEmojiSource(): EmojiSource | null`

Get the registered emoji source, if any.

#### `getHyphenationCallback(): HyphenationCallback | null`

Get the registered hyphenation callback, if any.

## Types

### FontDescriptor

```ts
type FontDescriptor = {
  fontFamily: string;
  fontStyle?: 'normal' | 'italic' | 'oblique';
  fontWeight?: FontWeight;
};
```

### FontWeight

```ts
type FontWeight =
  | number
  | 'thin'
  | 'hairline'
  | 'ultralight'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'demibold'
  | 'bold'
  | 'ultrabold'
  | 'extrabold'
  | 'heavy'
  | 'black';
```

### SingleLoad

```ts
type SingleLoad = {
  family: string;
  src: string;
  fontStyle?: 'normal' | 'italic' | 'oblique';
  fontWeight?: FontWeight;
  postscriptName?: string;
  method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
};
```

### BulkLoad

```ts
type BulkLoad = {
  family: string;
  fonts: FontSource[];
};
```

### EmojiSource

```ts
type EmojiSource =
  | { url: string; format?: string; withVariationSelectors?: boolean }
  | { builder: (code: string) => string; withVariationSelectors?: boolean };
```

### HyphenationCallback

```ts
type HyphenationCallback = (word: string) => string[];
```

## Supported Font Formats

- **TTF** - TrueType Font
- **WOFF** - Web Open Font Format
- **WOFF2** - Web Open Font Format 2.0

## License

MIT
