import renderToImage from './renderComponent';
import { Document, Page, Text, Font } from '..';

Font.registerEmojiSource({
  builder: code =>
    `https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/${code.toLowerCase()}_3d.png`,
});

describe('emoji', () => {
  test('should support builder function', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={[100, 100]}>
          <Text style={{ fontSize: 80 }}>💩</Text>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });
});
