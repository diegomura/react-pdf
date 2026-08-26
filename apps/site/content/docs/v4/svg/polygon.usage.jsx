import { Svg, Polygon } from '@react-pdf/renderer';

const Area = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Polygon
      points="8,46 28,34 48,38 68,20 88,26 112,10 112,52 8,52"
      fill="#e82200"
      stroke="#8d1602"
      strokeWidth={2}
    />
  </Svg>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Area />
    </Page>
  </Document>,
);
