import { BlobProvider, Document, Page, Text } from '@react-pdf/renderer';

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
);
