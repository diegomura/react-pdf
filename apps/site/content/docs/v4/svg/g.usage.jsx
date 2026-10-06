import { Svg, G, Rect, Circle } from '@react-pdf/renderer';

const Tilted = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <G
      fill="#e82200"
      stroke="#3e3e3e"
      strokeWidth={2}
      transform="rotate(-8, 60, 30)"
    >
      <Rect x="8" y="16" width="28" height="28" rx="4" />
      <Circle cx="60" cy="30" r="14" />
      <Rect x="84" y="16" width="28" height="28" rx="4" fill="#8d1602" />
    </G>
  </Svg>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Tilted />
    </Page>
  </Document>,
);
