/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import ReactPDF, {
  Document,
  Page,
  Text,
  Image,
  StyleSheet,
  Font,
} from '../../dist/react-pdf.es.js';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  image: {
    width: '60%',
    padding: 10,
    backgroundColor: 'grey',
  },
  text: {
    width: '40%',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 50,
    paddingVertical: 30,
    fontFamily: 'Oswald',
    color: '#212121',
  },
});

Font.register(
  'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
  { family: 'Oswald' },
);

const doc = (
  <Document>
    <Page style={styles.page} size={[1500, 600]} page>
      <Image
        style={styles.image}
        src="http://blog.oxforddictionaries.com/wp-content/uploads/mountain-names.jpg"
      />
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Text>
    </Page>
  </Document>
);

// Renders document and save it
ReactPDF.render(doc, `${__dirname}/output.pdf`);
