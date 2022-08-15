/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { Text, Document, Page } from '@react-pdf/primitives';
import renderToImage from './renderComponent';

const emptyString = '';

const mount = async children => {
  const image = await renderToImage(
    <Document>
      <Page>{children}</Page>
    </Document>,
  );

  return image;
};

describe('renderer', () => {
  test('empty string', async () => {
    const image = await mount(<>{emptyString && <Text>{emptyString}</Text>}</>);

    expect(image).toMatchImageSnapshot();
  });

  test('string', async () => {
    const image = await mount(<>{'text' || <Text>text</Text>}</>);

    expect(image).toMatchImageSnapshot();
  });

  test('boolean', async  () => {
    const image = await mount(<>{true || <Text>text</Text>}</>);

    expect(image).toMatchImageSnapshot();
  });

  test('zero', async () => {
    const image = await mount(<>{0 && <Text>text</Text>}</>);

    expect(image).toMatchImageSnapshot();
  });

  test('numbers', async () => {
    const image = await mount(<>{10 || <Text>text</Text>}</>);

    expect(image).toMatchImageSnapshot();
  });
});
