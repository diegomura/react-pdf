/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Document, Page, Svg, Font, Text, Tspan } from '..';
import renderToImage from './renderComponent';

// pdf.js does not render default fonts in node and I use Open Sans (:
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf',
});

const mount = async children => {
  const image = await renderToImage(
    <Document>
      <Page style={{ border: '1 solid #e2e2e2' }} size={[54, 47]}>
        {children}
      </Page>
    </Document>,
  );

  return image;
};

describe('Svg', () => {
  test('should render Tspan component', async () => {
    const image = await mount(
      <Svg width={52} viewBox="0 0 52 45">
        <Text x={2} y={20} style={{ fontFamily: 'Open Sans' }}>
          hello{' '}
          <Tspan x={2} y={35} fill="red">
            world
          </Tspan>
        </Text>
      </Svg>,
    );

    expect(image).toMatchImageSnapshot();
  });
});
