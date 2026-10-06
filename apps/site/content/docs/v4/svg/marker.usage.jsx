import {
  Svg,
  Defs,
  Marker,
  Path,
  Circle,
  Line,
  Polyline,
} from '@react-pdf/renderer';

const Flow = () => (
  <Svg viewBox="0 0 120 60" width={240} height={120}>
    <Defs>
      <Marker
        id="arrow"
        viewBox="0 0 10 10"
        refX={9}
        refY={5}
        markerWidth={6}
        markerHeight={6}
        orient="auto"
      >
        <Path d="M 0 0 L 10 5 L 0 10 z" fill="#e82200" />
      </Marker>
      <Marker
        id="dot"
        viewBox="0 0 10 10"
        refX={5}
        refY={5}
        markerWidth={4}
        markerHeight={4}
      >
        <Circle cx="5" cy="5" r="5" fill="#8d1602" />
      </Marker>
    </Defs>
    <Line
      x1="8"
      y1="16"
      x2="104"
      y2="16"
      stroke="#e82200"
      strokeWidth={2}
      markerEnd="url(#arrow)"
    />
    <Polyline
      points="8,48 36,32 64,44 92,26"
      fill="none"
      stroke="#c9c2b6"
      strokeWidth={2}
      markerStart="url(#dot)"
      markerMid="url(#dot)"
      markerEnd="url(#dot)"
    />
  </Svg>
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Flow />
    </Page>
  </Document>,
);
