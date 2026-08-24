const rect = `const styles = StyleSheet.create({
  page: { padding: 60 },
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <Svg viewBox="0 0 220 100">

        <Rect
          width="100"
          height="100"
          fill="black"
        />

        <Rect
          x="120"
          rx="15"
          ry="15"
          width="100"
          height="100"
          fill="black"
        />
      </Svg>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default rect;
