<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/mermaid

Render [Mermaid](https://mermaid.js.org/) diagrams as SVG in react-pdf documents. Powered by [beautiful-mermaid](https://github.com/nicholasgasior/beautiful-mermaid).

## Installation

```bash
yarn add @react-pdf/mermaid
```

## Usage

```jsx
import { Document, Page, View } from '@react-pdf/renderer';
import { Mermaid } from '@react-pdf/mermaid';

const MyDocument = () => (
  <Document>
    <Page size="A4">
      <View style={{ padding: 30 }}>
        <Mermaid width={400} height={300}>
          {`graph TD
            A[Start] --> B{Decision}
            B -->|Yes| C[OK]
            B -->|No| D[End]`}
        </Mermaid>
      </View>
    </Page>
  </Document>
);
```

## Supported Diagram Types

- Flowcharts (`graph TD`, `graph LR`)
- Sequence diagrams (`sequenceDiagram`)
- State diagrams (`stateDiagram-v2`)
- Class diagrams (`classDiagram`)
- ER diagrams (`erDiagram`)
- XY charts (`xychart-beta`)

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `string` | *required* | Mermaid diagram definition |
| `width` | `number \| string` | auto | Width of the rendered SVG |
| `height` | `number \| string` | auto | Height of the rendered SVG |
| `color` | `string` | `"black"` | Foreground/text color |
| `bg` | `string` | | Background color |
| `accent` | `string` | | Accent color (arrowheads, highlights) |
| `line` | `string` | | Edge/connector stroke color |
| `muted` | `string` | | Secondary text and label color |
| `surface` | `string` | | Node fill tint color |
| `border` | `string` | | Node stroke color |
| `transparent` | `boolean` | `false` | Use transparent background |
| `theme` | `string` | | Built-in theme name (see below) |
| `debug` | `boolean` | `false` | Adds a visible border for debugging layout |

## Themes

The following built-in themes are available via the `theme` prop:

- `tokyo-night`, `tokyo-night-storm`, `tokyo-night-light`
- `catppuccin-mocha`, `catppuccin-latte`
- `nord`, `nord-light`
- `dracula`
- `github-dark`, `github-light`
- `solarized-dark`, `solarized-light`
- `one-dark`
- `zinc-dark`, `zinc-light`

```jsx
<Mermaid theme="nord" width={400}>
  {`graph LR
    A --> B --> C`}
</Mermaid>
```

## License

MIT
