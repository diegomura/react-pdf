import React from 'react';
import {
  Text,
  Font,
  Page,
  View,
  Image,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

import Header from './Header';
import Skills from './Skills';
import Education from './Education';
import Experience from './Experience';

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
  },
  leftColumn: {
    flexDirection: 'column',
    width: 170,
    paddingTop: 30,
    paddingRight: 15,
    '@media max-width: 400': {
      width: '100%',
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
    marginTop: 15,
    paddingTop: 5,
    borderWidth: 3,
    borderColor: 'gray',
    borderStyle: 'dashed',
    '@media orientation: landscape': {
      marginTop: 10,
    },
  },
});

Font.register({
  family: 'Open Sans',
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

Font.register({
  family: 'Lato Italic',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
});

Font.register({
  family: 'Lato Bold',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});

const IMAGE_SRC =
  'https://i.guim.co.uk/img/media/a23aeb1f7ff20bb80f68852da17743b0e557f8ed/0_224_3504_2102/master/3504.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=9e9a99e479ee60270b69ede4d869b20f';

const Resume = (props) => (
  <Page {...props} style={styles.page}>
    <Header />
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image src={IMAGE_SRC} style={styles.image} />
        <Education />
        <Skills />
      </View>
      <Experience />
    </View>
    <Text style={styles.footer}>This IS the candidate you are looking for</Text>
  </Page>
);

const ResumeDocument = () => (
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

export default {
  id: 'resume',
  name: 'Resume',
  description: '',
  Document: ResumeDocument,
};
