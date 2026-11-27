import { Svg, Path } from '@react-pdf/renderer';

const Curve = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Path
      d="M 8 46 C 32 46, 36 14, 60 14 S 88 46, 112 14"
      fill="none"
      stroke="#e82200"
      strokeWidth={3}
      strokeLinecap="round"
    />
  </Svg>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Curve />
    </Page>
  </Document>,
);
