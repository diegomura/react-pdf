import { Document, Image, Page, View } from '..';
import renderToImage from './renderComponent';

const mount = async children => {
  const image = await renderToImage(
    <Document>
      <Page size={[244, 280]}>{children}</Page>
    </Document>,
  );

  return image;
};

describe('dynamic content', () => {
  test('should render an image', async () => {
    const url =
      'https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png';
    const image = await mount(
      <View
        render={() => <Image src={url} style={{ width: 244, height: 280 }} />}
      />,
    );

    expect(image).toMatchImageSnapshot();
  }, 10000);
});
