import React from 'react';
import ReactPDF, {
  Text,
  Document,
  Font,
  Page,
  StyleSheet,
  Image,
  View,
} from '../../dist/react-pdf.es.js';
import Header from './Header';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    '@media max-width: 400': {
      flexDirection: 'column',
    },
  },
  image: {
    marginBottom: 10,
    '@media max-width: 400': {
      width: 290,
    },
  },
  leftColumn: {
    flexDirection: 'column',
    width: 170,
    paddingTop: 30,
    paddingRight: 15,
    '@media max-width: 400': {
      width: 290,
      paddingRight: 0,
    },
    '@media orientation: landscape': {
      width: 200,
    },
  },
  footer: {
    fontSize: 12,
    fontFamily: 'Lato Bold',
    textAlign: 'center',
    marginTop: 25,
    paddingTop: 10,
    borderWidth: 3,
    borderColor: 'gray',
    borderStyle: 'dashed',
    '@media orientation: landscape': {
      marginTop: 10,
    },
  },
});

Font.register(`${__dirname}/fonts/fonts/Open_Sans/OpenSans-Regular.ttf`, {
  family: 'Open Sans',
});
Font.register(`${__dirname}/fonts/fonts/Lato/Lato-Regular.ttf`, {
  family: 'Lato',
});
Font.register(`${__dirname}/fonts/fonts/Lato/Lato-Italic.ttf`, {
  family: 'Lato Italic',
});
Font.register(`${__dirname}/fonts/fonts/Lato/Lato-Bold.ttf`, {
  family: 'Lato Bold',
});

const Resume = props => (
  <Page {...props} style={styles.page}>
    <Header />
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image
          src="https://react-pdf.org/static/images/luke.jpg"
          style={styles.image}
        />
        <Education />
        <Skills />
      </View>
      <Experience />
    </View>
    <Text style={styles.footer}>This IS the candidate you are looking for</Text>
  </Page>
);

const Output = () => (
  <Document
    author="Luke Skywalker"
    keywords="awesome, resume, start wars"
    subject="The resume of Luke Skywalker"
    title="Resume"
  >
    <Resume size="A4" />
    <Resume orientation="landscape" size="A4" />
    <Resume size={[380, 1250]} />
  </Document>
);

ReactPDF.render(<Output />, `${__dirname}/output.pdf`);
