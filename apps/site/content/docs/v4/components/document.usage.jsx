import { Document, Page, Text } from '@react-pdf/renderer';

const MyDocument = () => (
  <Document title="Invoice" author="Acme Inc.">
    <Page size="A4">
      <Text>First page</Text>
    </Page>
    <Page size="A4">
      <Text>Second page</Text>
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />);
