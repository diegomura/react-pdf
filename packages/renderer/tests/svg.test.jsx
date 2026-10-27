import { describe, expect, test } from 'vitest';

import { Document, Page, Svg, Font, Text, Tspan } from '@react-pdf/renderer';
import renderToImage from './renderComponent';
import {
  Tiger,
  Chart,
  Chart2,
  Gradients,
  Dasharrays,
  MarkerArrowLine,
  MarkerDotPolyline,
  MarkerAutoPath,
  MarkerDoubleArrow,
} from './svgs';

// pdf.js does not render default fonts in node and I use Open Sans (:
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf',
});

describe('Svg', () => {
  test('should render Tspan component', async () => {
    const image = await renderToImage(
      <Document>
        <Page
          style={{ border: '1 solid #e2e2e2', fontFamily: 'Open Sans' }}
          size={[54, 47]}
        >
          <Svg width={52} viewBox="0 0 52 45">
            <Text x={2} y={20} style={{ fontFamily: 'Open Sans' }}>
              hello{' '}
              <Tspan x={2} y={35} fill="red">
                world
              </Tspan>
            </Text>
          </Svg>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render Tiger', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={[400, 400]}>
          <Tiger />
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render Chart', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={[400, 267]}>
          <Chart />
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render Chart2', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={[400, 267]}>
          <Chart2 />
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render Gradients', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={[100, 200]}>
          <Gradients />
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render Dasharrays', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={[100, 200]}>
          <Dasharrays />
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render marker arrowhead on line', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={[200, 60]}>
          <MarkerArrowLine />
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render marker dots on polyline', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={[200, 80]}>
          <MarkerDotPolyline />
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render marker with orient auto on path', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={[200, 100]}>
          <MarkerAutoPath />
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should render double arrow with auto-start-reverse', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={[200, 60]}>
          <MarkerDoubleArrow />
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });
});
