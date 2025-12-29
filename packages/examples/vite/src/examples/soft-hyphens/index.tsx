import React from 'react';
import { Document, Page, Font, Text, StyleSheet } from '@react-pdf/renderer';

const shy = '\u00ad';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const styles = StyleSheet.create({
  body: {
    padding: 20,
  },
  text: {
    fontFamily: 'Oswald',
    fontSize: 20,
    width: 100,
    border: '1px solid red',
  },
});

const SoftHyphens = () => (
  <Document>
    <Page style={styles.body}>
      <Text
        style={styles.text}
      >{`Potentieel broeikas${shy}gas${shy}emissie${shy}rapport`}</Text>
    </Page>
  </Document>
);

export default {
  id: 'soft-hyphens',
  name: 'Soft Hyphens',
  description: '',
  Document: SoftHyphens,
};
