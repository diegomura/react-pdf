/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import b from 'benny';
import {
  Document,
  Page,
  View,
  Text,
  Font,
  StyleSheet,
  renderToStream,
} from '..';

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
  },
  row: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  text: {
    width: '60%',
    fontFamily: 'Oswald',
    textAlign: 'justify',
    fontSize: 50,
    padding: 20,
  },
  fill1: {
    width: '40%',
    backgroundColor: '#e14427',
  },
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const Doc = () => (
  <Document>
    <Page size="A4">
      <View style={styles.body}>
        <View style={styles.row}>
          <Text style={styles.text}>
            Lorem ipsum dolor sita met cons ecte tur ad ip Lorem ipsum dolor
            sita met cons ecte tur ad ip
          </Text>
          <View style={styles.fill1} />
        </View>

        <View style={styles.row}>
          <View style={styles.fill1} />
          <Text style={styles.text}>
            Lorem ipsum dolor sita met cons ecte tur ad ip Lorem ipsum dolor
            sita met cons ecte tur ad ip
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>
            Lorem ipsum dolor sita met cons ecte tur ad ip Lorem ipsum dolor
            sita met cons ecte tur ad ip
          </Text>
          <View style={styles.fill1} />
        </View>

        <View style={styles.row}>
          <View style={styles.fill1} />
          <Text style={styles.text}>
            Lorem ipsum dolor sita met cons ecte tur ad ip Lorem ipsum dolor
            sita met cons ecte tur ad ip
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

const nope = () => {};
const cycle = (_, summary) => {
  return summary.results
    .map(
      result =>
        `${result.name} x ${result.ops} ops/sec ±${result.margin}% (${result.samples} runs sampled)`,
    )
    .join('\n');
};

b.suite(
  'simple',

  b.add('generate doc', async () => {
    await renderToStream(<Doc />);
  }),

  b.cycle(cycle),
  b.complete(nope),
);
