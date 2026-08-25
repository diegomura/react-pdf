/**
 * Usage snippets for the component reference pages, keyed by page slug.
 *
 * They live here rather than inline in the MDX because MDX strips two spaces
 * of indentation from a multi-line template literal in a JSX attribute, which
 * silently flattened the nesting in every snippet.
 */
export const COMPONENT_USAGE: Record<string, string> = {
  document: `import { Document, Page, Text } from '@react-pdf/renderer';

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
  page: `import { Document, Page, Text } from '@react-pdf/renderer';

const MyDocument = () => (
  <Document>
    <Page size="A4" orientation="landscape" style={{ padding: 40 }}>
      <Text>A landscape A4 page with a 40pt margin</Text>
    </Page>
  </Document>
);`,
  view: `import { View, Text } from '@react-pdf/renderer';

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
  text: `import { Text } from '@react-pdf/renderer';

const Heading = () => (
  <Text style={{ fontSize: 18, marginBottom: 6 }}>
    Hello <Text style={{ color: 'tomato' }}>world</Text>
  </Text>
);`,
  link: `import { Text, Link } from '@react-pdf/renderer';

const Footer = () => (
  <Text style={{ fontSize: 10 }}>
    Built with <Link src="https://react-pdf.org">react-pdf</Link>
  </Text>
);`,
  image: `import { Image } from '@react-pdf/renderer';

const Logo = () => (
  <Image
    src="https://react-pdf.org/images/luke.jpg"
    style={{ width: 120, height: 120 }}
  />
);`,
  'image-background': `import { ImageBackground, Text } from '@react-pdf/renderer';

const Cover = () => (
  <ImageBackground
    src="https://react-pdf.org/images/mountains.jpg"
    style={{ height: 200, padding: 24, justifyContent: 'flex-end' }}
  >
    <Text style={{ color: 'white', fontSize: 24 }}>Annual report</Text>
  </ImageBackground>
);`,
  note: `import { View, Note } from '@react-pdf/renderer';

const Reviewed = () => (
  <View>
    <Note>Checked against the Q3 ledger.</Note>
  </View>
);`,
  canvas: `import { Canvas } from '@react-pdf/renderer';

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
  'pdf-viewer': `import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';

const App = () => (
  <PDFViewer style={{ width: '100%', height: '90vh' }}>
    <Document>
      <Page size="A4">
        <Text>Rendered in the browser</Text>
      </Page>
    </Document>
  </PDFViewer>
);`,
  'pdf-download-link': `import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';

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
  'blob-provider': `import { BlobProvider, Document, Page, Text } from '@react-pdf/renderer';

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
};
