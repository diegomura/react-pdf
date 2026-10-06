import { ImageBackground, Text } from '@react-pdf/renderer';

const Cover = () => (
  <ImageBackground
    src="https://react-pdf.org/images/mountains.jpg"
    style={{ height: 200, padding: 24, justifyContent: 'flex-end' }}
  >
    <Text style={{ color: 'white', fontSize: 24 }}>Annual report</Text>
  </ImageBackground>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Cover />
    </Page>
  </Document>,
);
