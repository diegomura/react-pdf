const lineargradient = `const styles = StyleSheet.create({
  page: { padding: 60 },
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <Svg viewBox="0 0 10 20" width="170">
        <Defs>
          <LinearGradient id="myLinearGradient">
            <Stop offset="5%" stopColor="gold" />
            <Stop offset="95%" stopColor="red" />
          </LinearGradient>
        </Defs>

        <Circle cx="5" cy="5" r="4" fill="url('#myLinearGradient')" />
      </Svg>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default lineargradient;
