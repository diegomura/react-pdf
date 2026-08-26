const quick_start = `// import React from 'react';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 11,
    lineHeight: 1.6,
    color: '#3f3f46',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e7',
    paddingBottom: 12,
  },
  title: {
    fontSize: 26,
    color: '#18181b',
    marginTop: 40,
    paddingBottom: 16,
    borderBottomWidth: 3,
    borderBottomColor: '#e0301e',
  },
  paragraph: {
    marginTop: 20,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>Field Notes</Text>
        <Text>Issue 01</Text>
      </View>

      <Text style={styles.title}>Documents, written in React</Text>

      <Text style={styles.paragraph}>
        Everything on this page is a component. View lays things out with
        flexbox, Text renders the copy, and StyleSheet keeps styling close to
        the CSS you already write.
      </Text>
      <Text style={styles.paragraph}>
        Edit any value above and the page redraws. No template language, no
        build step, just React.
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />);
`;

export default quick_start;
