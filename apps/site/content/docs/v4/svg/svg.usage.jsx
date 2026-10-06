import { Svg, Rect, Circle } from '@react-pdf/renderer';

const Canvas = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Rect x="0" y="0" width="120" height="60" fill="#c9c2b6" />
    <Circle cx="60" cy="30" r="22" fill="#e82200" />
  </Svg>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Canvas />
    </Page>
  </Document>,
);
