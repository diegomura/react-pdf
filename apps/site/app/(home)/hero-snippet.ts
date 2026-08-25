// A6 keeps the page legible at hero scale — an A4 would render at half this
// type size in a panel this small.
export const SNIPPET = `const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 11, lineHeight: 1.6 },
  title: { fontSize: 22, marginBottom: 14 },
  brand: { color: '#e8290b' },
  footer: { marginTop: 'auto', fontSize: 9 },
});

ReactPDF.render(
  <Document>
    <Page size="A6" style={styles.page}>
      <Text style={styles.title}>
        Hello, <Text style={styles.brand}>PDF</Text>
      </Text>
      <Text>
        A real PDF, drawn in your browser by
        React. Components, props, flexbox and
        stylesheets — all of it, on paper.
      </Text>
      <Text style={styles.footer}>react-pdf</Text>
    </Page>
  </Document>
);`;
