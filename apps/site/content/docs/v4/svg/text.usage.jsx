import { Svg, Text } from '@react-pdf/renderer';

const heading = { fontSize: 16 };
const caption = { fontSize: 9 };

const Label = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Text x="60" y="28" textAnchor="middle" fill="#3e3e3e" style={heading}>
      React-pdf
    </Text>
    <Text x="60" y="44" textAnchor="middle" fill="#e82200" style={caption}>
      draws text inside SVG
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
