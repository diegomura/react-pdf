const path = `const styles = StyleSheet.create({
  page: { padding: 60 },
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <Svg width="190" height="160">
        <Path
          d="M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
          stroke="rgb(128, 255, 0)"
          strokeWidth={3}
        />
      </Svg>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default path;
