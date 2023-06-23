import React from 'react';
import ReactPDF, {
  Document,
  Page,
  Font,
  StyleSheet,
} from '@nutshelllabs/renderer';

import Svg0 from './svg';
import Svg1 from './Svg1';
import Svg2 from './Svg2';
import Svg4 from './Svg4';
import Heart from './Heart';

console.log(`React version: ${React.version}`);
console.log(`React-pdf version: ${ReactPDF.version}`);

Font.registerEmojiSource({
  format: 'png',
  url: 'https://twemoji.maxcdn.com/2/72x72/',
});

Font.register({
  family: 'Roboto',
  src: '/Roboto-Regular.ttf',
});

Font.register({
  src: `/Roboto-Bold.ttf`,
  family: 'Roboto',
  fontWeight: 'bold',
});

Font.register({
  family: 'Noto Sans Tamil',
  src:
    'https://fonts.gstatic.com/ea/notosanstamil/v3/NotoSansTamil-Regular.ttf',
});

const styles = StyleSheet.create({
  page: {
    fontSize: 20,
    color: 'black',
    padding: '10',
  },
  image: {
    width: 100,
    borderRadius: 40,
    flexDirection: 'column',
  },
  text: {
    color: '#212121',
    fontFamily: 'Roboto',
    textAlign: 'justify',
  },
});

const App = () => {
  return (
    <Document title="Hey!" subject="Test">
      <Page size="A4" style={styles.page}>
        <Svg0 />
        <Svg1 />
        <Svg2 />
        <Svg4 />
        <Heart />
      </Page>
    </Document>
  );
};

export default App;
