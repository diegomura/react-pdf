import { Text, Link } from '@react-pdf/renderer';

const Footer = () => (
  <Text style={{ fontSize: 10 }}>
    Built with <Link src="https://react-pdf.org">react-pdf</Link>
  </Text>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Footer />
    </Page>
  </Document>,
);
