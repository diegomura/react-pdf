const radialgradient = `const styles = StyleSheet.create({
  page: { padding: 60 },
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <Svg viewBox="0 0 10 20" width="170">
        <Defs>
          <RadialGradient id="myRadialGradient">
            <Stop offset="10%" stopColor="gold" />
            <Stop offset="95%" stopColor="red" />
          </RadialGradient>
        </Defs>

        <Circle cx="5" cy="14" r="4" fill="url('#myRadialGradient')" />
      </Svg>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default radialgradient;
