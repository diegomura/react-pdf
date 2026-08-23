import React from 'react';
import {
  Document,
  Font,
  Text,
  Page,
  Image,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

import Quijote1 from '../../../public/quijote1.jpg';
import Quijote2 from '../../../public/quijote2.png';
import chapters from './chapters.json';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = StyleSheet.create({
  titleBlock: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Oswald',
    textAlign: 'center',
    color: '#2c1810',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#8B4513',
    width: 60,
    marginVertical: 16,
    alignSelf: 'center',
  },
  author: {
    fontSize: 13,
    textAlign: 'center',
    color: '#8B4513',
    fontFamily: 'Times-Roman',
    fontStyle: 'italic',
  },
  body: {
    paddingVertical: 50,
    paddingHorizontal: 65,
  },
  header: {
    fontSize: 8,
    textAlign: 'center',
    color: '#999',
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 24,
  },
  chapterHeading: {
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  chapterNumber: {
    fontSize: 36,
    fontFamily: 'Oswald',
    color: '#8B4513',
    marginBottom: 8,
  },
  chapterRule: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#8B4513',
    width: 40,
    marginVertical: 8,
  },
  chapterTitle: {
    fontSize: 14,
    fontFamily: 'Times-Roman',
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
    maxWidth: 320,
    lineHeight: 1.6,
  },
  text: {
    marginBottom: 10,
    fontSize: 11,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
    lineHeight: 1.7,
    color: '#333',
  },
  chapterImage: {
    marginVertical: 16,
    marginHorizontal: 60,
  },
  pageNumber: {
    fontSize: 9,
    textAlign: 'center',
    color: '#999',
    paddingTop: 28,
  },
});

const HR = () => <View style={styles.hr} />;

interface BookLayoutProps {
  pageNumber: number;
  totalPages: number;
  children: React.ReactNode;
}

// Repeating page chrome: everything around `children` renders on every
// page, and the running header's space is reserved automatically.
const BookLayout = ({ pageNumber, totalPages, children }: BookLayoutProps) => (
  <>
    <Text style={styles.header}>Don Quijote de la Mancha</Text>
    <View style={{ flexGrow: 1, flexBasis: 0 }}>{children}</View>
    <Text style={styles.pageNumber}>{`${pageNumber} / ${totalPages}`}</Text>
  </>
);

const ChapterHeading = ({ number, children, ...props }) => (
  <View style={styles.chapterHeading} {...props}>
    <Text style={styles.chapterNumber}>{number}</Text>
    <View style={styles.chapterRule} />
    <Text style={styles.chapterTitle}>{children}</Text>
    <View style={styles.chapterRule} />
  </View>
);

const PageWrap = () => (
  <Document>
    <Page style={styles.body} layout={BookLayout}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Don Quijote de la Mancha</Text>
        <HR />
        <Text style={styles.author}>Miguel de Cervantes</Text>
      </View>

      {chapters.map((chapter, index) => (
        <React.Fragment key={chapter.number}>
          <ChapterHeading number={chapter.number} break={index > 0}>
            {chapter.title}
          </ChapterHeading>

          <Image
            style={styles.chapterImage}
            src={index % 2 === 0 ? Quijote1 : Quijote2}
          />

          {chapter.paragraphs.map((paragraph, i) => (
            <Text key={i} style={styles.text}>
              {paragraph}
            </Text>
          ))}
        </React.Fragment>
      ))}
    </Page>
  </Document>
);

export default {
  id: 'page-wrap',
  name: 'Page Wrap',
  description: '',
  Document: PageWrap,
};
