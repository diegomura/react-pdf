import { Svg, Defs, ClipPath, Rect, Circle } from '@react-pdf/renderer';

const Window = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Defs>
      <ClipPath id="window">
        <Rect x="32" y="16" width="56" height="28" />
      </ClipPath>
    </Defs>
    <Circle cx="48" cy="30" r="24" fill="#e82200" clipPath="url(#window)" />
    <Circle cx="72" cy="30" r="24" fill="#8d1602" clipPath="url(#window)" />
  </Svg>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Window />
    </Page>
  </Document>,
);
