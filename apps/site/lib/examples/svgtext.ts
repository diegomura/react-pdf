const svgtext = `const styles = StyleSheet.create({
  page: { padding: 60 },
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <Svg viewBox="0 0 240 40">
        <Text x="10" y="30">
          React-pdf is cool
        </Text>
      </Svg>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default svgtext;
