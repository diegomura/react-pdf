const polyline = `const styles = StyleSheet.create({
  page: { padding: 60 },
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <Svg height="200" width="500">
        <Polyline
          points="20,20 40,25 60,40 80,120 120,140 200,180"
          stroke="black"
          strokeWidth={3}
        />
      </Svg>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default polyline;
