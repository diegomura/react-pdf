const fixed_components = `const styles = StyleSheet.create({
  container: {
    height: 1200,
    width: '100%',
  },
  fixed: {
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 10,
    position: 'absolute',
  }
});

const MyDocument = () => (
  <Document>
    <Page>
      <View style={styles.container} />

      <Text style={styles.fixed} fixed>
        I'm fixed to each page
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />);
`;

export default fixed_components;
