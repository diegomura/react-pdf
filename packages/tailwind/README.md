# React PDF Tailwind

Use Tailwind CSS to style PDFs created with [react-pdf](https://github.com/diegomura/react-pdf). This library essentially converts a compatible subset of the TailwindCSS class syntax into JS stylesheet objects that are compatible with `react-pdf`.

[Try it yourself](https://react-pdf-repl.vercel.app/?cp_code=JYWwDg9gTgLgBAbzgEQgYwK4gKYDsYA0cACgIYDm2RAKtgB6FwBqw2A7nAL5wBmUEIOACIAAlGyk0MALRgAJjwD043HOzioQgNwAoUJFiI4acaRjZqHbnwHDTU2QukxSwADZtgq7Tp1oIuADO8DAcALzGpuaWABQIOnBwMAAW2DgAXIgJiXD05qqZ8Tk5_m7QgYXZxYmYwQKZQv5QuDxlbOoARm4Y2EIEVTmc_cVD2aOcAJS6OvQG8Go8pBhu8DwYuFLAAXAAgmBgMRNZieIwGM1wMQMAPKiYOPgAfAOJ12SUcIHAAF7YYUI7AAsQk-MAAnm4_ghQjEhGBpIDeJC6Ej6NJ-BxWmi2FBSGA4OQ8QihBNOM9qjkEABtAB0dJ2UFxYJiAEYAEwTAC6NJAeJiMQA-kRgEcwo9Li9qtcWOxJRSANbYMFhBDAThy6rBCFQmFCLF0aQsuAgLzSNjSKlsgAMVrAME5cHhiP10lKcA65GkXR6hptJPVFIpOLxKsWbkC2ADgcS5OjOWutAYoO1Kt15gY0jZdDcvACMg6EDcciSeVdGDqIH9sbjOQAythNttVXAANRwFlRmvXRSJmDVuMJvLJyGptiw9MyQKV0n9msAGWgaTgwDAgSwcDkhegn2A8FIOEY_iCDfMZygcFIchXwECaC85Fybl3NLgADllm5SBqKRHwOpcjwPDAHeZ5wE-HTqBAy64GBpCLtgMAvvWxbAJIyw3kQvLkLgpCfOWd5gLu37VGAn5oOoZjGAIIAQJuRBQDe5ZJOchGBEkXh3nI6zwE-5DLKQRCSLkGA3jRxYAFbljAEDEcUv7LsWDFroEL7vm4n6CNgIlTrRcAAG7YMEwAdMs66QhAmGFk-bG8nQoBMYEeKsLgsk5N0UhMV4L4sHp-5MbykJrpeuF6csYAYC45hwNAOHiC-ACySxKXAEUXmg9yOS5NbFDw2DWd5wC-SATF4KAKXNAJKUrAx5FsVpuT8GxkhEB0xl4FxggGckwH8a5iSQSpJC4oZeDwCua6CNAd6WYFMCsASuJ6cAci4TASlzQAjj0F6MCthEmYEfX6bupDYLkwQvsQySkBG6lMZCHlsbgH6VUeEZbZR9UmiljDmOA5ZHeFbhLbFcC4NgW3YDSrndr2s5SooMpsPDiQTKSkrdu82D9t2dxYKNsZTDo6pAA&modules=true) in the `react-pdf-repl` interactive playground.

## Breaking changes in v3

**As of v3, this library uses Tailwind v4.** If you're upgrading from `react-pdf-tailwind` v2, you need to update your config to match the new structure (see [usage]("#usage")). The config was changed slightly because of internal changes in Tailwind v4.

If you for some reason prefer Tailwind v3 syntax, stick with v2 of this library.

## Example

```jsx
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

// Apply your own styles on top of Tailwind defaults
const tw = createTw({
  fontFamily: {
    sans: ["Papyrus"],
  },
  colors: {
    custom: "#bada55",
  },
});

export default function MyPdf() {
  return (
    <Document>
      <Page size="A4" style={tw("p-12 font-sans")}>
        <View style={tw("p-20 bg-gray-100")}>
          <Text style={tw("text-custom text-3xl")}>Section #1</Text>
        </View>
        <View style={tw("mt-12 px-8 rotate-2")}>
          <Text style={tw("text-amber-600 text-2xl")}>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
}
```

More detailed examples can be found in the [examples](https://github.com/aanckar/react-pdf-tailwind/tree/main/examples) folder.

## Installation

```js
// Or pnpm, yarn...
npm install react-pdf-tailwind
```

## Usage

The `createTw` function takes two arguments: the first is a theme config object, and the second is an optional options object with the following defaults.

The theme config contains your own styles and essentially gets merged into the `defaultTheme` object that Tailwind exposes. For reference, see the [source](https://github.com/tailwindlabs/tailwindcss/blob/main/packages/tailwindcss/src/compat/default-theme.ts).

```js
const tw = createTw(
  // Theme config
  {
    fontFamily: {
      sans: ["Papyrus"],
    },
    spacing: {
      verybig: "999rem",
    },
    colors: {
      custom: "#bada55",
    },
  },
  // Additional options (if needed)
  {
    // Set the base font size in points (see note below regarding units)
    ptPerRem: 12,
  }
);
```

### Older versions

In version 2.x, the config takes the same shape as in `tailwind.config.js`.

```js
const tw = createTw(
  // As in tailwind.config.js
  {
    theme: {
      fontFamily: {
        sans: ["Papyrus"],
      },
      extend: {
        spacing: {
          verybig: "999rem",
        },
        colors: {
          custom: "#bada55",
        },
      },
    },
  }
);
```

## Additonal notes

- Supports most of the CSS properties that make sense in a PDF context, and are supported by `react-pdf` (see [this list](https://react-pdf.org/styling#valid-css-properties))
- Default font family classes are excluded, since you have to [include your own fonts anyway](https://react-pdf.org/fonts)
- Internally uses `pt` as the default unit (supported units can be found [here](https://react-pdf.org/styling#valid-units)), using the default convention `1rem = 12pt` (this can be changed in the options)
- Since `react-pdf` uses [Yoga](https://yogalayout.com/) internally, some defaults differ from the web standard (for example, `flex-direction` defaults to `column`, which can be fixed by adding the `flex-row` class where needed)
- Modifiers like breakpoints (which could technically make sense) aren't supported yet
