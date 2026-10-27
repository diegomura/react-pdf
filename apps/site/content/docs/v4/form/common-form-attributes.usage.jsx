import { View, Text, TextInput } from '@react-pdf/renderer';

const field = { height: 18, borderWidth: 1, borderColor: '#c9c2b6' };
const label = { fontSize: 9, color: '#3e3e3e', marginBottom: 4 };

const Reference = () => (
  <View>
    <Text style={label}>Reference</Text>
    <TextInput
      name="ref"
      value="INV-0042"
      defaultValue="INV-0042"
      required
      readOnly
      style={field}
    />
  </View>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Reference />
    </Page>
  </Document>,
);
