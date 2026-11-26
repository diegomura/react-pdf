import { View, Text, List } from '@react-pdf/renderer';

const field = { height: 54, borderWidth: 1, borderColor: '#c9c2b6' };
const label = { fontSize: 9, color: '#3e3e3e', marginBottom: 4 };

const Countries = () => (
  <View>
    <Text style={label}>Countries</Text>
    <List
      name="countries"
      multiSelect
      select={['Argentina', 'Japan', 'Kenya']}
      style={field}
    />
  </View>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Countries />
    </Page>
  </Document>,
);
