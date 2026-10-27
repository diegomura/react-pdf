const debugging = `const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 400,
    margin: 20,
    paddingVertical: 20,
  },
});

const MyDocument = () => (
  <Document>
    <Page>
      <View style={styles.container} debug />
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />);
`;

export default debugging;
