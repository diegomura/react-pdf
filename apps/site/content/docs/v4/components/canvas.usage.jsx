import { Canvas } from '@react-pdf/renderer';

const Bar = () => (
  <Canvas
    style={{ width: 200, height: 40 }}
    paint={(painter, availableWidth, availableHeight) =>
      painter.rect(0, 0, availableWidth * 0.6, availableHeight).fill('tomato')
    }
  />
);

ReactPDF.render(
  <Document>
    <Page size="A6" style={{ padding: 16 }}>
      <Bar />
    </Page>
  </Document>,
);
