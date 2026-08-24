const breakable_unbreakable = `const styles = StyleSheet.create({
  page: { padding: 60 },
  title: { marginTop: "90%" },
  emphasis: { fontFamily: 'Helvetica-Bold', color: '#F22300' },
  breakable: { width: '100%', height: 400, backgroundColor: 'tomato' },
  unbreakable: { width: '100%', height: 400 },
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4" wrap>
      <Text style={styles.title}>This is a <Text style={styles.emphasis}>breakable</Text> component. You can see how it wraps to the next page:</Text>
      <View style={styles.breakable} />
      <Text style={styles.title}>This is an <Text style={styles.emphasis}>unbreakable</Text> component. Instead of wrapping, it jumps to the next page:</Text>
      <Image src="/images/quijote1.jpg" />
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default breakable_unbreakable;
