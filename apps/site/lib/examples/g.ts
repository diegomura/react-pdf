const g = `const styles = StyleSheet.create({
  page: { padding: 60 },
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <Svg viewBox="0 0 100 100">
        <G fill="white" stroke="green" stroke-width="5">
          <Circle cx="40" cy="40" r="25" />
          <Circle cx="60" cy="60" r="25" />
        </G>
      </Svg>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default g;
