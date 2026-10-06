import { Text } from '@react-pdf/renderer';

const Heading = () => (
  <Text style={{ fontSize: 18, marginBottom: 6 }}>
    Hello <Text style={{ color: 'tomato' }}>world</Text>
  </Text>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Heading />
    </Page>
  </Document>,
);
