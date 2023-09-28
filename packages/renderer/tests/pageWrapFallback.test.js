/* eslint-disable react/no-array-index-key */
import renderToImage from './renderComponent';
import { Document, Font, Page, Text, View, StyleSheet, Image } from '..';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald',
  },
  text: {
    fontFamily: 'Open Sans',
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    fontFamily: 'Open Sans',
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf',
});

const PageWrap = () => (
  <Document>
    <Page style={styles.body} wrap>
      <View wrap={false}>
        <Text style={styles.text}>{'yadayada '.repeat(1000)}</Text>
      </View>

      <View wrap={false}>
        <Text style={styles.text}>{'yada '.repeat(1000)}</Text>
      </View>

      <Image src="https://react-pdf.org/images/luke.jpg" />
      <Image
        break
        style={{ width: 99, height: 1000 }}
        src="https://react-pdf.org/images/luke.jpg"
      />
    </Page>
  </Document>
);

describe('pageBreak', () => {
  test('When content does not fit in one page, it should wrap if possible', async () => {
    const image = await renderToImage(<PageWrap />);

    expect(image).toMatchImageSnapshot();
  }, 30_000);
});
