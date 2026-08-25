/**
 * Usage snippets for the component reference pages, keyed by page slug.
 *
 * They live here rather than inline in the MDX because MDX strips two spaces
 * of indentation from a multi-line template literal in a JSX attribute, which
 * silently flattened the nesting in every snippet.
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
};

/** The preview source for a slug, or `null` where there is nothing to preview. */
export const previewSource = (usage: ComponentUsage) =>
  usage.mount ? `${usage.code}\n\n${usage.mount}` : null;
