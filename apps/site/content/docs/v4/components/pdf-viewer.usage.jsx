import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';

const App = () => (
  <PDFViewer style={{ width: '100%', height: '90vh' }}>
    <Document>
      <Page size="A4">
        <Text>Rendered in the browser</Text>
      </Page>
    </Document>
  </PDFViewer>
);
