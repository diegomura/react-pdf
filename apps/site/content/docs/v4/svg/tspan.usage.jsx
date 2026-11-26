import { Svg, Text, Tspan } from '@react-pdf/renderer';

const heading = { fontSize: 16 };

const Label = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Text x="24" y="36" fill="#3e3e3e" style={heading}>
      React <Tspan fill="#e82200">pdf</Tspan>
    </Text>
  </Svg>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Label />
    </Page>
  </Document>,
);
