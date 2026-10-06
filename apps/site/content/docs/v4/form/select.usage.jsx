import { View, Text, Select } from '@react-pdf/renderer';

const field = { height: 18, borderWidth: 1, borderColor: '#c9c2b6' };
const label = { fontSize: 9, color: '#3e3e3e', marginBottom: 4 };

const Country = () => (
  <View>
    <Text style={label}>Country</Text>
    <Select
      name="country"
      select={['Argentina', 'Japan', 'Kenya']}
      value="Argentina"
      style={field}
    />
  </View>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Country />
    </Page>
  </Document>,
);
