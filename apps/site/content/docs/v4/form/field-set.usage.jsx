import { FieldSet, View, Text, TextInput } from '@react-pdf/renderer';

const field = { height: 18, borderWidth: 1, borderColor: '#c9c2b6' };
const label = { fontSize: 9, color: '#3e3e3e', marginBottom: 4 };

const Address = () => (
  <FieldSet name="billing">
    <Text style={label}>Street</Text>
    <TextInput name="street" style={field} />
    <Text style={[label, { marginTop: 10 }]}>City</Text>
    <TextInput name="city" style={field} />
  </FieldSet>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Address />
    </Page>
  </Document>,
);
