import { View, Text } from '@react-pdf/renderer';

const Row = () => (
  <View style={{ flexDirection: 'row', gap: 10 }}>
    <View style={{ flex: 1, backgroundColor: '#eee', padding: 8 }}>
      <Text>Sidebar</Text>
    </View>
    <View style={{ flex: 2, padding: 8 }}>
      <Text>Content</Text>
    </View>
  </View>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Row />
    </Page>
  </Document>,
);
