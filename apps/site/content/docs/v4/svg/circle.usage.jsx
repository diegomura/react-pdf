import { Svg, Circle } from '@react-pdf/renderer';

const Rings = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Circle cx="48" cy="30" r="24" fill="#e82200" />
    <Circle cx="72" cy="30" r="24" fill="#8d1602" opacity={0.75} />
  </Svg>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Rings />
    </Page>
  </Document>,
);
