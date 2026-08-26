/**
 * Usage snippets for the component reference pages, keyed by page slug.
 *
 * They live here rather than inline in the MDX because MDX strips two spaces
 * of indentation from a multi-line template literal in a JSX attribute, which
 * silently flattened the nesting in every snippet.
 *
 * The SVG and form snippets share one visual language so the reference reads
 * as a set: the brand red `#e82200` is always the subject, `#8d1602` its
 * second voice, `#c9c2b6` the neutral it sits on and `#3e3e3e` the ink. Every
 * SVG example draws on the same 120×60 canvas at the same 240×120 size, and
 * every form example reuses the same `field` box so a Checkbox, TextInput,
 * Select and List read as one form.
 */
export type ComponentUsage = {
  /** The snippet shown on the page. Most are fragments, not whole documents. */
  code: string;
  /**
   * Appended to `code` to make it runnable in the preview REPL, which requires
   * a `ReactPDF.render(...)` call. `Document`, `Page` and `ReactPDF` come from
   * the evaluator's globals, so no imports are needed here. Omitted where the
   * component is browser-only and has no page of its own to show.
   */
  mount?: string;
};

/** The A6 preview page every SVG and form snippet is dropped onto. */
const mount = (component: string) => `ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <${component} />
    </Page>
  </Document>
);`;

export const COMPONENT_USAGE: Record<string, ComponentUsage> = {
  document: {
    code: `import { Document, Page, Text } from '@react-pdf/renderer';

const MyDocument = () => (
  <Document title="Invoice" author="Acme Inc.">
    <Page size="A4">
      <Text>First page</Text>
    </Page>
    <Page size="A4">
      <Text>Second page</Text>
    </Page>
  </Document>
);`,
    mount: `ReactPDF.render(<MyDocument />);`,
  },
  page: {
    code: `import { Document, Page, Text } from '@react-pdf/renderer';

const MyDocument = () => (
  <Document>
    <Page size="A4" orientation="landscape" style={{ padding: 40 }}>
      <Text>A landscape A4 page with a 40pt margin</Text>
    </Page>
  </Document>
);`,
    mount: `ReactPDF.render(<MyDocument />);`,
  },
  view: {
    code: `import { View, Text } from '@react-pdf/renderer';

const Row = () => (
  <View style={{ flexDirection: 'row', gap: 10 }}>
    <View style={{ flex: 1, backgroundColor: '#eee', padding: 8 }}>
      <Text>Sidebar</Text>
    </View>
    <View style={{ flex: 2, padding: 8 }}>
      <Text>Content</Text>
    </View>
  </View>
);`,
    mount: `ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Row />
    </Page>
  </Document>
);`,
  },
  text: {
    code: `import { Text } from '@react-pdf/renderer';

const Heading = () => (
  <Text style={{ fontSize: 18, marginBottom: 6 }}>
    Hello <Text style={{ color: 'tomato' }}>world</Text>
  </Text>
);`,
    mount: `ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Heading />
    </Page>
  </Document>
);`,
  },
  link: {
    code: `import { Text, Link } from '@react-pdf/renderer';

const Footer = () => (
  <Text style={{ fontSize: 10 }}>
    Built with <Link src="https://react-pdf.org">react-pdf</Link>
  </Text>
);`,
    mount: `ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Footer />
    </Page>
  </Document>
);`,
  },
  image: {
    code: `import { Image } from '@react-pdf/renderer';

const Logo = () => (
  <Image
    src="https://react-pdf.org/images/luke.jpg"
    style={{ width: 120, height: 120 }}
  />
);`,
    mount: `ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Logo />
    </Page>
  </Document>
);`,
  },
  'image-background': {
    code: `import { ImageBackground, Text } from '@react-pdf/renderer';

const Cover = () => (
  <ImageBackground
    src="https://react-pdf.org/images/mountains.jpg"
    style={{ height: 200, padding: 24, justifyContent: 'flex-end' }}
  >
    <Text style={{ color: 'white', fontSize: 24 }}>Annual report</Text>
  </ImageBackground>
);`,
    mount: `ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Cover />
    </Page>
  </Document>
);`,
  },
  // A note is an annotation, not page content: the page renders blank and the
  // viewer's annotation layer draws the sticky-note icon as a broken image,
  // because pdf.js looks for it under an `imageResourcesPath` we do not serve.
  note: {
    code: `import { View, Note } from '@react-pdf/renderer';

const Reviewed = () => (
  <View>
    <Note>Checked against the Q3 ledger.</Note>
  </View>
);`,
  },
  canvas: {
    code: `import { Canvas } from '@react-pdf/renderer';

const Bar = () => (
  <Canvas
    style={{ width: 200, height: 40 }}
    paint={(painter, availableWidth, availableHeight) =>
      painter
        .rect(0, 0, availableWidth * 0.6, availableHeight)
        .fill('tomato')
    }
  />
);`,
    mount: `ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Bar />
    </Page>
  </Document>
);`,
  },
  // The three below render React to the DOM rather than to a page, so there is
  // no PDF for the preview to show — hence no `mount`.
  'pdf-viewer': {
    code: `import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';

const App = () => (
  <PDFViewer style={{ width: '100%', height: '90vh' }}>
    <Document>
      <Page size="A4">
        <Text>Rendered in the browser</Text>
      </Page>
    </Document>
  </PDFViewer>
);`,
  },
  'pdf-download-link': {
    code: `import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';

const invoice = (
  <Document>
    <Page size="A4">
      <Text>Invoice #42</Text>
    </Page>
  </Document>
);

const App = () => (
  <PDFDownloadLink document={invoice} fileName="invoice.pdf">
    {({ loading }) => (loading ? 'Preparing document...' : 'Download')}
  </PDFDownloadLink>
);`,
  },
  'blob-provider': {
    code: `import { BlobProvider, Document, Page, Text } from '@react-pdf/renderer';

const invoice = (
  <Document>
    <Page size="A4">
      <Text>Invoice #42</Text>
    </Page>
  </Document>
);

const App = () => (
  <BlobProvider document={invoice}>
    {({ url, loading }) =>
      loading ? <span>Rendering...</span> : <a href={url}>Open PDF</a>
    }
  </BlobProvider>
);`,
  },

  'svg/svg': {
    code: `import { Svg, Rect, Circle } from '@react-pdf/renderer';

const Canvas = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Rect x="0" y="0" width="120" height="60" fill="#c9c2b6" />
    <Circle cx="60" cy="30" r="22" fill="#e82200" />
  </Svg>
);`,
    mount: mount('Canvas'),
  },
  'svg/circle': {
    code: `import { Svg, Circle } from '@react-pdf/renderer';

const Rings = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Circle cx="48" cy="30" r="24" fill="#e82200" />
    <Circle cx="72" cy="30" r="24" fill="#8d1602" opacity={0.75} />
  </Svg>
);`,
    mount: mount('Rings'),
  },
  'svg/ellipse': {
    code: `import { Svg, Ellipse } from '@react-pdf/renderer';

const Lenses = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Ellipse cx="48" cy="30" rx="34" ry="20" fill="#e82200" />
    <Ellipse cx="72" cy="30" rx="34" ry="20" fill="#8d1602" opacity={0.75} />
  </Svg>
);`,
    mount: mount('Lenses'),
  },
  'svg/rect': {
    code: `import { Svg, Rect } from '@react-pdf/renderer';

const Swatches = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Rect x="8" y="14" width="32" height="32" rx="4" fill="#e82200" />
    <Rect x="44" y="14" width="32" height="32" rx="4" fill="#8d1602" />
    <Rect x="80" y="14" width="32" height="32" rx="4" fill="#c9c2b6" />
  </Svg>
);`,
    mount: mount('Swatches'),
  },
  'svg/line': {
    code: `import { Svg, Line } from '@react-pdf/renderer';

const Rules = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Line x1="8" y1="16" x2="112" y2="16" stroke="#c9c2b6" strokeWidth={3} />
    <Line x1="8" y1="30" x2="112" y2="30" stroke="#c9c2b6" strokeWidth={3} />
    <Line x1="8" y1="44" x2="68" y2="44" stroke="#e82200" strokeWidth={3} />
  </Svg>
);`,
    mount: mount('Rules'),
  },
  'svg/polyline': {
    code: `import { Svg, Polyline } from '@react-pdf/renderer';

const Trend = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Polyline
      points="8,46 28,34 48,38 68,20 88,26 112,10"
      fill="none"
      stroke="#e82200"
      strokeWidth={3}
      strokeLinejoin="round"
    />
  </Svg>
);`,
    mount: mount('Trend'),
  },
  // The closed sibling of the Polyline example: same six readings, filled.
  'svg/polygon': {
    code: `import { Svg, Polygon } from '@react-pdf/renderer';

const Area = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Polygon
      points="8,46 28,34 48,38 68,20 88,26 112,10 112,52 8,52"
      fill="#e82200"
      stroke="#8d1602"
      strokeWidth={2}
    />
  </Svg>
);`,
    mount: mount('Area'),
  },
  'svg/path': {
    code: `import { Svg, Path } from '@react-pdf/renderer';

const Curve = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Path
      d="M 8 46 C 32 46, 36 14, 60 14 S 88 46, 112 14"
      fill="none"
      stroke="#e82200"
      strokeWidth={3}
      strokeLinecap="round"
    />
  </Svg>
);`,
    mount: mount('Curve'),
  },
  'svg/g': {
    code: `import { Svg, G, Rect, Circle } from '@react-pdf/renderer';

const Tilted = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <G
      fill="#e82200"
      stroke="#3e3e3e"
      strokeWidth={2}
      transform="rotate(-8, 60, 30)"
    >
      <Rect x="8" y="16" width="28" height="28" rx="4" />
      <Circle cx="60" cy="30" r="14" />
      <Rect x="84" y="16" width="28" height="28" rx="4" fill="#8d1602" />
    </G>
  </Svg>
);`,
    mount: mount('Tilted'),
  },
  'svg/defs': {
    code: `import { Svg, Defs, LinearGradient, Stop, Rect } from '@react-pdf/renderer';

const Reused = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Defs>
      <LinearGradient id="ember" x1="0" y1="0" x2="1" y2="0">
        <Stop offset="0" stopColor="#e82200" />
        <Stop offset="1" stopColor="#8d1602" />
      </LinearGradient>
    </Defs>
    <Rect x="8" y="14" width="48" height="32" rx="4" fill="url(#ember)" />
    <Rect x="64" y="14" width="48" height="32" rx="4" fill="url(#ember)" />
  </Svg>
);`,
    mount: mount('Reused'),
  },
  'svg/linear-gradient': {
    code: `import { Svg, Defs, LinearGradient, Stop, Rect } from '@react-pdf/renderer';

const Ember = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Defs>
      <LinearGradient id="ember" x1="0" y1="0" x2="1" y2="0">
        <Stop offset="0" stopColor="#e82200" />
        <Stop offset="1" stopColor="#8d1602" />
      </LinearGradient>
    </Defs>
    <Rect x="8" y="14" width="104" height="32" rx="4" fill="url(#ember)" />
  </Svg>
);`,
    mount: mount('Ember'),
  },
  'svg/radial-gradient': {
    code: `import { Svg, Defs, RadialGradient, Stop, Rect } from '@react-pdf/renderer';

const Glow = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Defs>
      <RadialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
        <Stop offset="0" stopColor="#e82200" />
        <Stop offset="1" stopColor="#8d1602" />
      </RadialGradient>
    </Defs>
    <Rect x="8" y="14" width="104" height="32" rx="4" fill="url(#glow)" />
  </Svg>
);`,
    mount: mount('Glow'),
  },
  'svg/stop': {
    code: `import { Svg, Defs, LinearGradient, Stop, Rect } from '@react-pdf/renderer';

const Ramp = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Defs>
      <LinearGradient id="ramp" x1="0" y1="0" x2="1" y2="0">
        <Stop offset="0" stopColor="#e82200" />
        <Stop offset="0.5" stopColor="#c9c2b6" />
        <Stop offset="1" stopColor="#8d1602" />
      </LinearGradient>
    </Defs>
    <Rect x="8" y="14" width="104" height="32" rx="4" fill="url(#ramp)" />
  </Svg>
);`,
    mount: mount('Ramp'),
  },
  'svg/clip-path': {
    code: `import { Svg, Defs, ClipPath, Rect, Circle } from '@react-pdf/renderer';

const Window = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Defs>
      <ClipPath id="window">
        <Rect x="32" y="16" width="56" height="28" />
      </ClipPath>
    </Defs>
    <Circle cx="48" cy="30" r="24" fill="#e82200" clipPath="url(#window)" />
    <Circle cx="72" cy="30" r="24" fill="#8d1602" clipPath="url(#window)" />
  </Svg>
);`,
    mount: mount('Window'),
  },
  'svg/text': {
    code: `import { Svg, Text } from '@react-pdf/renderer';

const heading = { fontSize: 16 };
const caption = { fontSize: 9 };

const Label = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Text x="60" y="28" textAnchor="middle" fill="#3e3e3e" style={heading}>
      React-pdf
    </Text>
    <Text x="60" y="44" textAnchor="middle" fill="#e82200" style={caption}>
      draws text inside SVG
    </Text>
  </Svg>
);`,
    mount: mount('Label'),
  },
  'svg/tspan': {
    code: `import { Svg, Text, Tspan } from '@react-pdf/renderer';

const heading = { fontSize: 16 };

const Label = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Text x="24" y="36" fill="#3e3e3e" style={heading}>
      React <Tspan fill="#e82200">pdf</Tspan>
    </Text>
  </Svg>
);`,
    mount: mount('Label'),
  },
  'svg/presentation-attributes': {
    code: `import { Svg, Circle, Rect } from '@react-pdf/renderer';

const Attributes = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Rect x="8" y="14" width="44" height="32" fill="#e82200" opacity={0.4} />
    <Circle
      cx="88"
      cy="30"
      r="20"
      fill="#c9c2b6"
      stroke="#8d1602"
      strokeWidth={3}
      strokeDasharray="6 4"
    />
  </Svg>
);`,
    mount: mount('Attributes'),
  },

  'form/text-input': {
    code: `import { View, Text, TextInput } from '@react-pdf/renderer';

const field = { height: 18, borderWidth: 1, borderColor: '#c9c2b6' };
const label = { fontSize: 9, color: '#3e3e3e', marginBottom: 4 };

const NameField = () => (
  <View>
    <Text style={label}>Full name</Text>
    <TextInput name="name" value="Ada Lovelace" style={field} />
  </View>
);`,
    mount: mount('NameField'),
  },
  'form/checkbox': {
    code: `import { View, Text, Checkbox } from '@react-pdf/renderer';

const box = { width: 12, height: 12, borderWidth: 1, borderColor: '#c9c2b6' };
const label = { fontSize: 9, color: '#3e3e3e' };

const Consent = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
    <Checkbox name="terms" checked style={box} />
    <Text style={label}>I accept the terms</Text>
  </View>
);`,
    mount: mount('Consent'),
  },
  'form/select': {
    code: `import { View, Text, Select } from '@react-pdf/renderer';

const field = { height: 18, borderWidth: 1, borderColor: '#c9c2b6' };
const label = { fontSize: 9, color: '#3e3e3e', marginBottom: 4 };

const Country = () => (
  <View>
    <Text style={label}>Country</Text>
    <Select
      name="country"
      select={['Argentina', 'Japan', 'Kenya']}
      value="Argentina"
      style={field}
    />
  </View>
);`,
    mount: mount('Country'),
  },
  'form/list': {
    code: `import { View, Text, List } from '@react-pdf/renderer';

const field = { height: 54, borderWidth: 1, borderColor: '#c9c2b6' };
const label = { fontSize: 9, color: '#3e3e3e', marginBottom: 4 };

const Countries = () => (
  <View>
    <Text style={label}>Countries</Text>
    <List
      name="countries"
      multiSelect
      select={['Argentina', 'Japan', 'Kenya']}
      style={field}
    />
  </View>
);`,
    mount: mount('Countries'),
  },
  'form/field-set': {
    code: `import { FieldSet, View, Text, TextInput } from '@react-pdf/renderer';

const field = { height: 18, borderWidth: 1, borderColor: '#c9c2b6' };
const label = { fontSize: 9, color: '#3e3e3e', marginBottom: 4 };

const Address = () => (
  <FieldSet name="billing">
    <Text style={label}>Street</Text>
    <TextInput name="street" style={field} />
    <Text style={[label, { marginTop: 10 }]}>City</Text>
    <TextInput name="city" style={field} />
  </FieldSet>
);`,
    mount: mount('Address'),
  },
  'form/common-form-attributes': {
    code: `import { View, Text, TextInput } from '@react-pdf/renderer';

const field = { height: 18, borderWidth: 1, borderColor: '#c9c2b6' };
const label = { fontSize: 9, color: '#3e3e3e', marginBottom: 4 };

const Reference = () => (
  <View>
    <Text style={label}>Reference</Text>
    <TextInput
      name="ref"
      value="INV-0042"
      defaultValue="INV-0042"
      required
      readOnly
      style={field}
    />
  </View>
);`,
    mount: mount('Reference'),
  },
};

/** The preview source for a slug, or `null` where there is nothing to preview. */
export const previewSource = (usage: ComponentUsage) =>
  usage.mount ? `${usage.code}\n\n${usage.mount}` : null;
