import { View, Text, Checkbox } from '@react-pdf/renderer';

const box = { width: 12, height: 12, borderWidth: 1, borderColor: '#c9c2b6' };
const label = { fontSize: 9, color: '#3e3e3e' };

const Consent = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
    <Checkbox name="terms" checked style={box} />
    <Text style={label}>I accept the terms</Text>
  </View>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Consent />
    </Page>
  </Document>,
);
