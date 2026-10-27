import { Image } from '@react-pdf/renderer';

const Logo = () => (
  <Image
    src="https://react-pdf.org/images/luke.jpg"
    style={{ width: 120, height: 120 }}
  />
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Logo />
    </Page>
  </Document>,
);
