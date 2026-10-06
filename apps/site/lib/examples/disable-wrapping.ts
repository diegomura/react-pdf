const disable_wrapping = `const red = '#e82200';
const deep = '#8d1602';
const sand = '#c9c2b6';
const ink = '#3e3e3e';

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 11, color: ink },
  label: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, letterSpacing: 1.2 },
  intro: { fontSize: 11, lineHeight: 1.5, marginTop: 7, marginBottom: 16 },
  caption: { fontSize: 8, letterSpacing: 1, marginBottom: 5 },
  note: { fontSize: 8.5, lineHeight: 1.4, marginBottom: 6, color: deep },
  band: { width: 118, borderWidth: 0.75, borderColor: red },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    paddingHorizontal: 6,
    borderBottomWidth: 0.5,
    borderColor: sand,
  },
  index: { fontFamily: 'Courier-Bold', color: red, marginRight: 7 },
});

const rows = Array.from({ length: 14 }, (_, i) => i + 1);

const doc = (
  <Document>
    <Page size="A6" style={styles.page} wrap>
      <Text style={[styles.label, { color: red }]}>
        THE SAME BAND, MADE UNBREAKABLE
      </Text>
      <Text style={styles.intro}>
        This is the block that split down the middle in the previous example.
        With wrap turned off it moves the way an Image would.
      </Text>

      <Text style={styles.caption}>BREAKABLE VIEW — WRAP DISABLED</Text>
      <Text style={styles.note}>Most of them fitted here. None stayed.</Text>
      <View style={styles.band} wrap={false}>
        {rows.map((n) => (
          <View key={n} style={styles.row}>
            <Text style={styles.index}>{String(n).padStart(2, '0')}</Text>
            <Text>table row</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default disable_wrapping;
