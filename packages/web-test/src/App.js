import React from 'react';
import {
  Document,
  Page,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={[styles.section, { backgroundColor: 'red' }]} />
      <View style={[styles.section, { backgroundColor: 'yellow' }]} />
    </Page>
  </Document>
);

function App() {
  return (
    <div className="App">
      <PDFViewer style={{ width: '100vw', height: '100vh' }}>
        <MyDocument />
      </PDFViewer>
    </div>
  );
}

export default App;
