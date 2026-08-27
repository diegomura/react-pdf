import { Svg, Circle, Rect } from '@react-pdf/renderer';

const Attributes = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Rect x="8" y="14" width="44" height="32" fill="#e82200" opacity={0.4} />
    <Circle
      cx="88"
      cy="30"
      r="20"
      fill="#c9c2b6"
      stroke="#8d1602"
      strokeWidth={3}
      strokeDasharray="6 4"
    />
  </Svg>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Attributes />
    </Page>
  </Document>,
);
