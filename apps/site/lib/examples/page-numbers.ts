const page_numbers = `const styles = StyleSheet.create({
  page: { padding: 60 },
  box: { width: '100%', marginBottom: 30, borderRadius: 5 },
  pageNumbers: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center'
  },
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4" wrap>
      <View style={[styles.box, { height: 400, backgroundColor: 'tomato' }]} />
      <View style={[styles.box, { height: 280, backgroundColor: 'crimson' }]} />
      <View style={[styles.box, { height: 600, backgroundColor: 'deepskyblue' }]} />
      <View style={[styles.box, { height: 400, backgroundColor: 'tomato' }]} />
      <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
        \`\${pageNumber} / \${totalPages}\`
      )} fixed />
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default page_numbers;
