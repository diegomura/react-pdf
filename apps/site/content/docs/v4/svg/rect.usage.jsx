import { Svg, Rect } from '@react-pdf/renderer';

const Swatches = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Rect x="8" y="14" width="32" height="32" rx="4" fill="#e82200" />
    <Rect x="44" y="14" width="32" height="32" rx="4" fill="#8d1602" />
    <Rect x="80" y="14" width="32" height="32" rx="4" fill="#c9c2b6" />
  </Svg>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Swatches />
    </Page>
  </Document>,
);
