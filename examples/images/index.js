/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';

import useTransformImage from './useTransformImage';

import ReactPDF, {
  Document,
  Page,
  Text,
  View,
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
    height: '100%',
    padding: 10,
    backgroundColor: 'grey',
  },
  textWrapper: {
    width: '40%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 50,
    paddingVertical: 30,
  },
  text: {
    fontFamily: 'Oswald',
    color: '#212121',
  },
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const doc = () => {
  const imageBuffer = useTransformImage(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Borah_Peak_ID_2-22-15.JPG/1280px-Borah_Peak_ID_2-22-15.JPG',
  );
  return (
    <Document>
      <Page style={styles.page} size={[1500, 600]} page>
        <View style={styles.image}>
          <Image src={imageBuffer} />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

// Renders document and save it
ReactPDF.render(React.createElement(doc), `${__dirname}/output.pdf`);
