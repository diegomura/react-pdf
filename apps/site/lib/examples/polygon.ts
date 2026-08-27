const polygon = `const styles = StyleSheet.create({
  page: { padding: 60 },
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <Svg height="210" width="500">
        <Polygon
          points="200,10 250,190 160,210"
          fill="tomato"
          stroke="gray"
          strokeWidth={1}
        />
      </Svg>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default polygon;
