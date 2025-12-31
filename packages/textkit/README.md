<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/textkit

> An advanced text layout framework

A comprehensive text layout engine for react-pdf. Handles complex text rendering including bidirectional text, line breaking, hyphenation, justification, font substitution, and text decoration.

## Acknowledges

This project is a fork of [textkit](https://github.com/foliojs/textkit) by @devongovett and continued under the scope of this project since it has react-pdf specific features. Any recongnition should go to him and the original project mantainers.

## Installation

```bash
yarn add @react-pdf/textkit
```

## Usage

```js
import layoutEngine, {
  bidi,
  linebreaker,
  justification,
  textDecoration,
  scriptItemizer,
  wordHyphenation,
  fontSubstitution,
  fromFragments,
} from '@react-pdf/textkit';

// Create engines configuration
const engines = {
  bidi: bidi(),
  linebreaker: linebreaker({}),
  justification: justification({}),
  textDecoration: textDecoration(),
  scriptItemizer: scriptItemizer(),
  wordHyphenation: wordHyphenation(),
  fontSubstitution: fontSubstitution(),
};

// Create attributed string from fragments
const attributedString = fromFragments([
  { string: 'Hello ', attributes: { fontSize: 12, font: [myFont] } },
  { string: 'World!', attributes: { fontSize: 12, font: [myFont] } },
]);

// Define container
const container = {
  x: 0,
  y: 0,
  width: 400,
  height: 600,
};

// Layout text
const layout = layoutEngine(engines);
const paragraphs = layout(attributedString, container, {});
```

## Layout Process

The layout engine processes text through the following steps:

1. Split into paragraphs
2. Get bidi runs and paragraph direction
3. Font substitution - map to resolved font runs
4. Script itemization
5. Font shaping - text to glyphs
6. Line breaking
7. Bidi reordering
8. Justification
9. Get a list of rectangles by intersecting path, line, and exclusion paths
10. Perform line breaking to get acceptable break points for each fragment
11. Ellipsize line if necessary
12. Bidi reordering
13. Justification

## Engines

The layout engine uses several specialized engines that can be customized:

### bidi

Handles bidirectional text analysis using the Unicode Bidirectional Algorithm. Determines text direction for mixed LTR/RTL content.

```js
import { bidi } from '@react-pdf/textkit';

const bidiEngine = bidi();
const result = bidiEngine(attributedString);
```

### linebreaker

Performs line breaking using the Knuth-Plass algorithm with fallback to best-fit. Handles hyphenation points and produces optimal line breaks.

```js
import { linebreaker } from '@react-pdf/textkit';

const linebreakerEngine = linebreaker({
  tolerance: 4,
  hyphenationPenalty: 100,
});
```

### justification

Adjusts character and word spacing to achieve justified text alignment. Based on Apple's justification algorithm.

```js
import { justification } from '@react-pdf/textkit';

const justificationEngine = justification({
  expandCharFactor: { before: 0, after: 0 },
  shrinkCharFactor: { before: 0, after: 0 },
  expandWhitespaceFactor: { before: 0.5, after: 0.5 },
  shrinkWhitespaceFactor: { before: 0.5, after: 0.5 },
});
```

### fontSubstitution

Automatically substitutes fonts when the primary font doesn't have glyphs for certain characters. Picks the best font from the font stack.

```js
import { fontSubstitution } from '@react-pdf/textkit';

const fontSubstitutionEngine = fontSubstitution();
```

### scriptItemizer

Identifies Unicode script runs in text (Latin, Arabic, Han, etc.) to enable proper font selection and shaping.

```js
import { scriptItemizer } from '@react-pdf/textkit';

const scriptItemizerEngine = scriptItemizer();
```

### wordHyphenation

Provides word hyphenation using language-specific patterns. Supports soft hyphens and custom hyphenation callbacks.

```js
import { wordHyphenation } from '@react-pdf/textkit';

const wordHyphenationEngine = wordHyphenation();
const syllables = wordHyphenationEngine('hyphenation'); // ['hy', 'phen', 'a', 'tion']
```

### textDecoration

Generates decoration lines (underline, strikethrough) for styled text runs.

```js
import { textDecoration } from '@react-pdf/textkit';

const textDecorationEngine = textDecoration();
```

## API Reference

### layoutEngine(engines)

Creates a layout function with the specified engines.

```js
const layout = layoutEngine(engines);
const paragraphs = layout(attributedString, container, options);
```

### fromFragments(fragments)

Creates an AttributedString from text fragments.

```js
import { fromFragments } from '@react-pdf/textkit';

const attributedString = fromFragments([
  { string: 'Hello ', attributes: { fontSize: 14 } },
  { string: 'World!', attributes: { fontSize: 14, color: 'blue' } },
]);
```

## Types

### AttributedString

The main data structure representing styled text:

```ts
type AttributedString = {
  string: string;
  runs: Run[];
  syllables?: string[];
  box?: Rect;
  decorationLines?: DecorationLine[];
};
```

### Run

A styled segment of text:

```ts
type Run = {
  start: number;
  end: number;
  attributes: Attributes;
  glyphs?: Glyph[];
  positions?: Position[];
  glyphIndices?: number[];
};
```

### Attributes

Style attributes for text runs:

```ts
type Attributes = {
  align?: string;
  alignLastLine?: string;
  attachment?: Attachment;
  backgroundColor?: string;
  bidiLevel?: number;
  characterSpacing?: number;
  color?: string;
  direction?: 'rtl' | 'ltr';
  features?: unknown[];
  fill?: boolean;
  font?: Font[];
  fontSize?: number;
  hangingPunctuation?: boolean;
  hyphenationFactor?: number;
  indent?: number;
  justificationFactor?: number;
  lineHeight?: number;
  lineSpacing?: number;
  link?: string;
  margin?: number;
  marginLeft?: number;
  marginRight?: number;
  opacity?: number;
  padding?: number;
  paddingTop?: number;
  paragraphSpacing?: number;
  scale?: number;
  script?: unknown;
  shrinkFactor?: number;
  strike?: boolean;
  strikeColor?: string;
  strikeStyle?: string;
  stroke?: boolean;
  underline?: boolean;
  underlineColor?: string;
  underlineStyle?: string;
  verticalAlign?: string;
  wordSpacing?: number;
  yOffset?: number;
};
```

### Container

The area where text will be laid out:

```ts
type Container = {
  x: number;
  y: number;
  width: number;
  height: number;
  truncateMode?: 'ellipsis';
  maxLines?: number;
  excludeRects?: Rect[];
};
```

### Rect

A rectangle definition:

```ts
type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
```

### Fragment

Input format for creating attributed strings:

```ts
type Fragment = {
  string: string;
  attributes?: Attributes;
};
```

### LayoutOptions

Options for the layout process:

```ts
type LayoutOptions = {
  hyphenationCallback?: (
    word: string | null,
    fallback: (word: string | null) => string[],
  ) => string[];
  tolerance?: number;
  hyphenationPenalty?: number;
  expandCharFactor?: JustificationFactor;
  shrinkCharFactor?: JustificationFactor;
  expandWhitespaceFactor?: JustificationFactor;
  shrinkWhitespaceFactor?: JustificationFactor;
};
```

### Engines

The engines configuration object:

```ts
type Engines = {
  bidi: ReturnType<typeof bidi>;
  linebreaker: ReturnType<typeof linebreaker>;
  justification: ReturnType<typeof justification>;
  fontSubstitution: ReturnType<typeof fontSubstitution>;
  scriptItemizer: ReturnType<typeof scriptItemizer>;
  textDecoration: ReturnType<typeof textDecoration>;
  wordHyphenation?: ReturnType<typeof wordHyphenation>;
};
```

## License

MIT
