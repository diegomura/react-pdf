const circle = `const styles = StyleSheet.create({
  page: { padding: 60 },
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <Svg viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="40"
          fill="tomato"
          stroke="gray"
        />
      </Svg>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default circle;
