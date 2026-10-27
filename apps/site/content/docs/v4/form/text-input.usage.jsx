import { View, Text, TextInput } from '@react-pdf/renderer';

const field = { height: 18, borderWidth: 1, borderColor: '#c9c2b6' };
const label = { fontSize: 9, color: '#3e3e3e', marginBottom: 4 };

const NameField = () => (
  <View>
    <Text style={label}>Full name</Text>
    <TextInput name="name" value="Ada Lovelace" style={field} />
  </View>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <NameField />
    </Page>
  </Document>,
);
