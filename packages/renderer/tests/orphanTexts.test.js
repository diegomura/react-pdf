/* eslint-disable react/jsx-curly-brace-presence */
import { Text, Document, Page } from '@nutshelllabs-pdf/primitives';
import renderToImage from './renderComponent';

const emptyString = '';

const mount = async children => {
  const image = await renderToImage(
    <Document>
      <Page size={[100, 100]}>{children}</Page>
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

  test('boolean', async () => {
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

  test('empty text element', async () => {
    const image = await mount(<Text />);

    expect(image).toMatchImageSnapshot();
  });
});
