const clippath = `const styles = StyleSheet.create({
  page: { padding: 60 },
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <Svg viewBox="0 0 100 100">
        <Defs>
          <ClipPath id="clipPath">
            <Rect x="15" y="15" width="40" height="40" />
          </ClipPath>
        </Defs>

        <Circle
          cx="25"
          cy="25"
          r="20"
          fill="#0000ff"
          clipPath="url(#clipPath)"
        />
      </Svg>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default clippath;
