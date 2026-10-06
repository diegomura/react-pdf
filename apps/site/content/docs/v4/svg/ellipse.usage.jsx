import { Svg, Ellipse } from '@react-pdf/renderer';

const Lenses = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Ellipse cx="48" cy="30" rx="34" ry="20" fill="#e82200" />
    <Ellipse cx="72" cy="30" rx="34" ry="20" fill="#8d1602" opacity={0.75} />
  </Svg>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Lenses />
    </Page>
  </Document>,
);
