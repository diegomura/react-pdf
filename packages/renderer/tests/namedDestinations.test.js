/* eslint-disable react/no-array-index-key */
import { Document, Font, Link, Page, Text, View } from '@react-pdf/renderer';
import renderToImage from './renderComponent';

Font.register({
  family: 'Lato',
  src: 'https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf',
});

const Doc = () => (
  <Document>
    <Page
      orientation="landscape"
      size="A4"
      style={{ padding: 30, fontSize: 24, fontFamily: 'Lato' }}
    >
      <View>
        <Link href="#nameddestination">
          <Text>Click me to get to the named destination</Text>
        </Link>
      </View>
      <View id="nameddestination" break>
        <Text>Here is the named destination</Text>
      </View>
    </Page>
  </Document>
);

describe('named destinations', () => {
  test('should visually match snapshot', async () => {
    const image = await renderToImage(<Doc />);

    expect(image).toMatchImageSnapshot();
  });
});
