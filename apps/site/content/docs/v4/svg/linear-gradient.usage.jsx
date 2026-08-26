import { Svg, Defs, LinearGradient, Stop, Rect } from '@react-pdf/renderer';

const Ember = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Defs>
      <LinearGradient id="ember" x1="0" y1="0" x2="1" y2="0">
        <Stop offset="0" stopColor="#e82200" />
        <Stop offset="1" stopColor="#8d1602" />
      </LinearGradient>
    </Defs>
    <Rect x="8" y="14" width="104" height="32" rx="4" fill="url(#ember)" />
  </Svg>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Ember />
    </Page>
  </Document>,
);
