import { Svg, Polyline } from '@react-pdf/renderer';

const Trend = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Polyline
      points="8,46 28,34 48,38 68,20 88,26 112,10"
      fill="none"
      stroke="#e82200"
      strokeWidth={3}
      strokeLinejoin="round"
    />
  </Svg>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Trend />
    </Page>
  </Document>,
);
