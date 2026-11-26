const emoji = `const styles = StyleSheet.create({
  container: {
    height: 700,
    marginVertical: 70,
    marginHorizontal: "10%"
  },
  text: {
    fontSize: 100,
    textAlign: 'center'
  }
});

Font.registerEmojiSource({
  format: 'png',
  url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});

const MyDocument = () => (
  <Document>
    <Page>
      <View style={styles.container}>
        <Text style={styles.text}>
          😀💩👻🙈
        </Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />);
`;

export default emoji;
