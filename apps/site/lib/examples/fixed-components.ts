const fixed_components = `const red = '#e82200';
const deep = '#8d1602';
const sand = '#c9c2b6';
const ink = '#3e3e3e';

const styles = StyleSheet.create({
  page: { padding: 24, paddingBottom: 44, fontSize: 11, color: ink },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottomWidth: 1.5,
    borderColor: red,
    paddingBottom: 5,
    marginBottom: 12,
  },
  brand: { fontFamily: 'Helvetica-Bold', fontSize: 15, letterSpacing: -0.4 },
  small: { fontSize: 8, letterSpacing: 1.2, color: deep },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    paddingHorizontal: 6,
    borderBottomWidth: 0.5,
    borderColor: sand,
  },
  index: { fontFamily: 'Courier-Bold', color: red, marginRight: 7 },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    fontSize: 8,
    letterSpacing: 1.2,
    color: deep,
    textAlign: 'center',
  },
});

const rows = Array.from({ length: 20 }, (_, i) => i + 1);

const doc = (
  <Document>
    <Page size="A6" style={styles.page} wrap>
      <View style={styles.header} fixed>
        <Text style={styles.brand}>Field manual</Text>
        <Text style={styles.small}>REV 4</Text>
      </View>

      {rows.map((n) => (
        <View key={n} style={styles.row}>
          <Text style={styles.index}>{String(n).padStart(2, '0')}</Text>
          <Text>inspection point</Text>
        </View>
      ))}

      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          \`PAGE \${pageNumber} OF \${totalPages}\`
        }
        fixed
      />
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default fixed_components;
