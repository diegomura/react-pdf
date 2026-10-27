const disable_hyphenation = `Font.registerHyphenationCallback(word => {
  // Return entire word as unique part
  return [word];
});

const styles = StyleSheet.create({
  container: {
    padding: 50
  },
  text: {
    textAlign: 'justify'
  }
});

const MyDocument = () => (
  <Document>
    <Page style={styles.container}>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed vulputate erat id sagittis porta. Phasellus ut diam
        sit amet mi sagittis faucibus sed in purus. Etiam pretium
        et lacus sit amet fringilla. Aenean hendrerit volutpat nulla,
        at facilisis ante bibendum non. Integer ut nulla nulla.
        Etiam ornare interdum iaculis. Sed lectus nisl, faucibus
        vitae posuere ut, lobortis in lectus. Donec ac magna in
        libero tincidunt volutpat. Donec ut varius quam. Duis ornare
        justo quis sapien bibendum cursus.
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />);
`;

export default disable_hyphenation;
