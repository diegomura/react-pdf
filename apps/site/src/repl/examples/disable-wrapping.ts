const disable_wrapping = `const styles = StyleSheet.create({
  page: { padding: 60 },
  title: { marginTop: "90%" },
  emphasis: { fontFamily: 'Helvetica-Bold', color: '#F22300' },
  breakable: { width: '100%', height: 400, backgroundColor: 'tomato' }
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4" wrap>
      <Text style={styles.title}>This is a <Text style={styles.emphasis}>breakable</Text> component made <Text style={styles.emphasis}>unbreakable</Text>. Instead of wrapping between both pages, it jumps straight to the next one</Text>
      <View style={styles.breakable} wrap={false} />
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default disable_wrapping;
