import { describe, expect, test } from 'vitest';

import {
  Document,
  Page,
  View,
  Text,
  Link,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';
import renderToImage from './renderComponent';

Font.register({
  family: 'NotoSansJP',
  src: 'https://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75s.ttf',
});

const styles = StyleSheet.create({
  title: {
    margin: 20,
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: '#e4e4e4',
    textTransform: 'uppercase',
    fontFamily: 'Oswald',
  },
  body: {
    flexGrow: 1,
  },
  row: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  block: {
    flexGrow: 1,
  },
  text: {
    width: '60%',
    margin: 10,
    fontFamily: 'Oswald',
    textAlign: 'justify',
  },
  fill1: {
    width: '40%',
    backgroundColor: '#e14427',
  },
  fill2: {
    flexGrow: 2,
    backgroundColor: '#e6672d',
  },
  fill3: {
    flexGrow: 2,
    backgroundColor: '#e78632',
  },
  fill4: {
    flexGrow: 2,
    backgroundColor: '#e29e37',
  },
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const TextTest = () => (
  <Document>
    <Page size="A4">
      <Link
        style={styles.title}
        href="https://es.wikipedia.org/wiki/Lorem_ipsum"
      >
        Lorem Ipsum
      </Link>
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum.
          </Text>
          <View style={styles.fill1} />
        </View>
        <View style={styles.row}>
          <View style={styles.fill2} />
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum.
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum.
          </Text>
          <View style={styles.fill3} />
        </View>
      </View>
    </Page>
  </Document>
);

describe('text', () => {
  test('should match snapshot', async () => {
    const image = await renderToImage(<TextTest />);

    expect(image).toMatchImageSnapshot();
  });

  test('should support verticalAlign super and sub', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={[90, 35]}>
          <Text style={{ fontFamily: 'Oswald' }}>
            Lorem
            <Text style={{ verticalAlign: 'super', fontSize: 10 }}>ipsum</Text>
            <Text style={{ verticalAlign: 'sub', fontSize: 10 }}>dolor</Text>
          </Text>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should hyphenate text with soft hyphen', async () => {
    const shy = '\u00ad';

    const style = {
      text: {
        fontFamily: 'Oswald',
        fontSize: 20,
        width: 100,
        border: '1px solid red',
      },
    };

    const image = await renderToImage(
      <Document>
        <Page style={{ padding: 20 }}>
          <Text
            style={style.text}
          >{`Potentieel broeikas${shy}gas${shy}emissie${shy}rapport`}</Text>

          <Text
            style={style.text}
          >{`Potentieel broeikas${shy}gasemissie${shy}rapport`}</Text>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should wrap CJK text at character boundaries', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={[200, 120]} style={{ padding: 10 }}>
          <View style={{ width: 80, padding: 5, border: '1px solid #ccc' }}>
            <Text style={{ fontFamily: 'NotoSansJP', fontSize: 12 }}>
              本当に長いテキスト
            </Text>
          </View>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should wrap mixed CJK and Latin text', async () => {
    const image = await renderToImage(
      <Document>
        <Page size={[200, 120]} style={{ padding: 10 }}>
          <View style={{ width: 100, padding: 5, border: '1px solid #ccc' }}>
            <Text style={{ fontFamily: 'NotoSansJP', fontSize: 12 }}>
              Hello世界！これはテストです。
            </Text>
          </View>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should control hyphens and hyphenateCharacter', async () => {
    const shy = '­';
    const word = `Potentieel broeikas${shy}gas${shy}emissie${shy}rapport`;

    const style = {
      fontFamily: 'Oswald',
      fontSize: 16,
      width: 90,
      marginBottom: 10,
      border: '1px solid red',
    };

    const image = await renderToImage(
      <Document>
        <Page size={[130, 320]} style={{ padding: 10 }}>
          <Text style={style}>{word}</Text>
          <Text style={{ ...style, hyphens: 'none' }}>{word}</Text>
          <Text style={{ ...style, hyphenateCharacter: '~' }}>{word}</Text>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should keep CJK words together with wordBreak keep-all', async () => {
    const text = 'グレートブリテン および 北アイルランド 連合王国';

    const style = {
      fontFamily: 'NotoSansJP',
      fontSize: 12,
      width: 100,
      marginBottom: 10,
      border: '1px solid #ccc',
    };

    const image = await renderToImage(
      <Document>
        <Page size={[130, 200]} style={{ padding: 10 }}>
          <Text style={style}>{text}</Text>
          <Text style={{ ...style, wordBreak: 'keep-all' }}>{text}</Text>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });

  test('should break anywhere with wordBreak break-all', async () => {
    const url = 'https://example.com/very/very/loooong/path/to/resource';

    const style = {
      fontFamily: 'Oswald',
      fontSize: 12,
      width: 150,
      marginBottom: 10,
      border: '1px solid red',
    };

    const image = await renderToImage(
      <Document>
        <Page size={[180, 140]} style={{ padding: 10 }}>
          <Text style={style}>{url}</Text>
          <Text style={{ ...style, wordBreak: 'break-all' }}>{url}</Text>
        </Page>
      </Document>,
    );

    expect(image).toMatchImageSnapshot();
  });
});
