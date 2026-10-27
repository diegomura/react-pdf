const ellipse = `const styles = StyleSheet.create({
  page: { padding: 60 },
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <Svg viewBox="0 0 200 100">
        <Ellipse
          cx="100"
          cy="50"
          rx="80"
          ry="40"
          fill="tomato"
          stroke="gray"
        />
      </Svg>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default ellipse;
