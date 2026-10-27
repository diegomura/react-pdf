import { Svg, Line } from '@react-pdf/renderer';

const Rules = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Line x1="8" y1="16" x2="112" y2="16" stroke="#c9c2b6" strokeWidth={3} />
    <Line x1="8" y1="30" x2="112" y2="30" stroke="#c9c2b6" strokeWidth={3} />
    <Line x1="8" y1="44" x2="68" y2="44" stroke="#e82200" strokeWidth={3} />
  </Svg>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Rules />
    </Page>
  </Document>,
);
