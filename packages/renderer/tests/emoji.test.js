import renderToImage from './renderComponent';
import { Document, Page, Text, Font } from '..';

describe.skip('emoji', () => {
  test('should support builder function', async () => {
    Font.registerEmojiSource({
      builder: code =>
        `https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/${code.toLowerCase()}_3d.png`,
    });

    const image = await renderToImage(
      <Document>
        <Page size={[100, 100]}>
          <Text style={{ fontSize: 80 }}>💩</Text>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should support Unicode 13.0 emoji', async () => {
    Font.registerEmojiSource({
      format: 'png',
      url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
    });

    const image = await renderToImage(
      <Document>
        <Page size={[100, 100]}>
          <Text style={{ fontSize: 80 }}>🦫</Text>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });
});
