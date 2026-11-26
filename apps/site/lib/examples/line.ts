const line = `const styles = StyleSheet.create({
  page: { padding: 60 },
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <Svg height="210" width="500">
        <Line
          x1="0"
          y1="0"
          x2="200"
          y2="200"
          strokeWidth={2}
          stroke="rgb(255,0,0)"
        />
      </Svg>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default line;
