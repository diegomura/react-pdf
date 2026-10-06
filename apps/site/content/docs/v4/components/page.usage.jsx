import { Document, Page, Text } from '@react-pdf/renderer';

const MyDocument = () => (
  <Document>
    <Page size="A4" orientation="landscape" style={{ padding: 40 }}>
      <Text>A landscape A4 page with a 40pt margin</Text>
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />);
