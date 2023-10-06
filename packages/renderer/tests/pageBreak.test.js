/* eslint-disable react/no-array-index-key */
import renderToImage from './renderComponent';
import { Document, Font, Page, Text, View, StyleSheet } from '..';

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
  footer: {
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
      <Text style={styles.header} fixed>
        ~ Created with react-pdf ~
      </Text>
      <Text style={styles.text}>New Page 1</Text>

      <Text style={styles.text}>
        <Text style={styles.text}>
          {'New Page 1 Content'.repeat(800)}
          End of Page 1 content
        </Text>
      </Text>
      <Text style={styles.text} break>
        New Page 2
      </Text>
      <Text style={styles.text}>New Page 2 Content</Text>
      <>
        <View>
          <Text style={styles.text} break>
            New Page 3
          </Text>
          <Text style={styles.text}>
            {'New Page 3 Content'.repeat(1000)}
            End of Page 3 content
          </Text>
          <>
            <Text style={styles.text} break>
              New Page 4
              <Text style={styles.text}>
                {'New Page 4 Content'.repeat(1000)}
                End of Page 4 content
              </Text>
              <Text style={styles.text} break>
                New Page 5
              </Text>
              <Text style={styles.text}>New Page 5 Content</Text>
            </Text>
          </>
        </View>
      </>
      <View break>
        <Text style={styles.text}>New Page 6</Text>
        <Text style={styles.text}>New Page 6 Content</Text>
      </View>
      <View break>
        <Text style={styles.text}>New Page 7</Text>
        <Text style={styles.text}>New Page 7 Content</Text>
        <Text break style={styles.text}>
          New Page 8
        </Text>
        <Text style={styles.text}>New Page 8 Content</Text>
        <View break>
          <Text style={styles.text}>
            {`New Page ${9}`}
            <Text style={styles.text}>New Page 9 Content</Text>
          </Text>
          <View>
            <View break>
              <Text style={styles.text}>
                New Page 10
                <Text style={styles.text}>New Page 10 Content</Text>
              </Text>
            </View>
            <Text style={styles.text} break>
              New Page 11
              <Text style={styles.text}>New Page 11 Content</Text>
            </Text>
            <Text style={styles.text} break>
              New Page 12
              <Text style={styles.text}>New Page 12 Content</Text>
              <Text style={styles.text} break>
                New Page 13
                <Text style={styles.text}>New Page 13 Content</Text>
                <Text style={styles.text} break>
                  New Page 14
                  <Text style={styles.text}>New Page 14 Content</Text>
                </Text>
              </Text>
            </Text>
            <View break>
              <Text style={styles.text}>
                New Page 15
                <Text style={styles.text}>New Page 15 Content</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);

describe('pageBreak', () => {
  test('should put every break instance on a new page', async () => {
    const image = await renderToImage(<PageWrap />);

    expect(image).toMatchImageSnapshot();
  }, 30_000);
});
