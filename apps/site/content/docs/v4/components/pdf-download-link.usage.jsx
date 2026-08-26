import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';

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
);
