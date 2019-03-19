/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';

import ReactPDF, {
  Document,
  Page,
  View,
  Text,
  Link,
  Font,
  StyleSheet,
} from '../../dist/react-pdf.es.js';

const styles = StyleSheet.create({
  title: {
    margin: 20,
    fontSize: 25,
    textAlign: 'center',
    backgroundColor: '#e4e4e4',
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
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

Font.register(`${__dirname}/fonts/Roboto-Regular.ttf`, { family: 'Roboto' });
Font.register(
  'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
  { family: 'Oswald' },
);

const doc = (
  <Document>
    <Page size="A4">
      <Link
        style={styles.title}
        src="https://es.wikipedia.org/wiki/Lorem_ipsum"
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
        <View style={styles.row}>
          <View style={styles.fill4} />
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum.
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/output.pdf`);
