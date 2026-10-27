<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/hyphenate

> Fast Liang hyphenation with language scoped exports

Splits words into syllables using the TeX hyphenation patterns, with an entry point per language. Patterns are compiled into a trie once, so hyphenating a word costs a handful of short lookups rather than a scan of every pattern in the set.

## Installation

```bash
yarn add @react-pdf/hyphenate
```

## Usage

Import the language you need and hyphenate:

```js
import { syllables, hyphenate } from '@react-pdf/hyphenate/en-us';

syllables('extraordinary'); // ['ex', 'tra', 'or', 'di', 'nary']
hyphenate('extraordinary'); // 'ex­tra­or­di­nary'
```

Each language is its own entry point, so bundlers only include the patterns you actually import:

```js
import { syllables as syllablesDE } from '@react-pdf/hyphenate/de';
import { syllables as syllablesES } from '@react-pdf/hyphenate/es';

syllablesDE('Silbentrennung'); // ['Sil', 'ben', 'tren', 'nung']
syllablesES('caballero'); // ['ca', 'ba', 'lle', 'ro']
```

Results are cached per language, so repeated words are free.

## Usage with react-pdf

Register a language other than the default `en-us` through `Font.registerHyphenationCallback`:

```js
import { Font } from '@react-pdf/renderer';
import { syllables } from '@react-pdf/hyphenate/de';

Font.registerHyphenationCallback(syllables);
```

To disable hyphenation entirely, return the word untouched:

```js
Font.registerHyphenationCallback((word) => [word]);
```

## API Reference

### syllables(word)

Splits a word into the syllables it may break into. Punctuation stays attached to the syllable it belongs to, and words shorter than five letters are returned whole.

```js
import { syllables } from '@react-pdf/hyphenate/en-us';

syllables('something'); // ['some', 'thing']
syllables('something.'); // ['some', 'thing.']
syllables('cat'); // ['cat']
```

### hyphenate(word)

Same as `syllables`, joined with soft hyphens (`­`).

```js
import { hyphenate } from '@react-pdf/hyphenate/en-us';

hyphenate('something'); // 'some­thing'
```

### patterns

The raw pattern set backing the language, should you need to pass it elsewhere.

```js
import { patterns } from '@react-pdf/hyphenate/en-us';
```

### createHyphenator(patterns)

Builds a hyphenator from any pattern set. The language entry points are thin wrappers around this.

```js
import createHyphenator from '@react-pdf/hyphenate';
import patterns from 'hyphen/patterns/nl.js';

const { syllables, hyphenate } = createHyphenator(patterns);
```

## Languages

Pattern data comes from [hyphen](https://github.com/ytiurin/hyphen), so every language it ships is available under the same name:

`af` `as` `be` `bg` `bn` `ca` `cop` `cs` `cu` `cy` `da` `de` `de-1901` `de-1996` `de-ch-1901` `el` `el-monoton` `el-polyton` `en` `en-gb` `en-us` `es` `et` `ethi` `eu` `fi` `fr` `fur` `ga` `gl` `grc` `gu` `hi` `hr` `hsb` `hu` `hy` `ia` `id` `is` `it` `ka` `kmr` `kn` `la` `la-x-classic` `la-x-liturgic` `lt` `lv` `ml` `mn` `mn-cyrl` `mn-cyrl-x-lmc` `mr` `mul-ethi` `nb` `nl` `nn` `no` `oc` `or` `pa` `pi` `pl` `pms` `pt` `rm` `ro` `ru` `sa` `sh` `sh-cyrl` `sh-latn` `sk` `sl` `sr` `sr-cyrl` `sv` `ta` `te` `th` `tk` `tr` `uk` `zh` `zh-latn-pinyin`

## Comparison

Measured on 20,000 unique English words from the system dictionary, so no library's cache ever hits and the numbers reflect matching alone. Each library ran in its own process, best of five. Sizes are for an `en-us` bundle, minified and gzipped with esbuild.

| Library                    | Matcher | With `en-us` patterns | Per word |
| -------------------------- | ------- | --------------------- | -------- |
| `@react-pdf/hyphenate`     | 0.9 KB  | 19.4 KB               | 0.80 µs  |
| `hypher` 0.2.5             | 1.9 KB  | 17.4 KB               | 1.08 µs  |
| `hyphenated` 1.2.0         | —       | 22.4 KB               | 3.36 µs  |
| `@lunarisapp/hyphen` 1.2.1 | —       | see below             | 3.46 µs  |
| `hyphen` 1.6.4             | 2.0 KB  | 20.2 KB               | 70.77 µs |

`hypher` is the closest comparison: about a third slower per word, though it ships fewer bytes because its pattern data is more compact — 15.5 KB against 18.3 KB gzipped. The matcher itself is less than half the size of any other in the group.

`@lunarisapp/hyphen` exposes every language through a single entry point rather than per-language subpaths, so an `en-us` bundle measured 2 MB gzipped with all dictionaries included. That is not comparable to the other rows and is left out of the table.

`hyphenopoly` 6.1.0 is not listed. It compiles patterns to WebAssembly (20.5 KB for `en-us`, plus a loader) and sets up asynchronously, making it a different shape of tool rather than a faster or slower one.

## License

MIT
