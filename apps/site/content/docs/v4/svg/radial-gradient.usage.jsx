import { Svg, Defs, RadialGradient, Stop, Rect } from '@react-pdf/renderer';

const Glow = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Defs>
      <RadialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
        <Stop offset="0" stopColor="#e82200" />
        <Stop offset="1" stopColor="#8d1602" />
      </RadialGradient>
    </Defs>
    <Rect x="8" y="14" width="104" height="32" rx="4" fill="url(#glow)" />
  </Svg>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Glow />
    </Page>
  </Document>,
);
