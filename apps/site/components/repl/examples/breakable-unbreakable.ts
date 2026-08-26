const breakable_unbreakable = `const red = '#e82200';
const deep = '#8d1602';
const sand = '#c9c2b6';
const ink = '#3e3e3e';

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 11, color: ink },
  label: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, letterSpacing: 1.2 },
  intro: { fontSize: 11, lineHeight: 1.5, marginTop: 7, marginBottom: 16 },
  columns: { flexDirection: 'row', justifyContent: 'space-between' },
  caption: { fontSize: 8, letterSpacing: 1, marginBottom: 5 },
  note: { fontSize: 8.5, lineHeight: 1.4, marginBottom: 6, color: deep },
  band: { borderWidth: 0.75, borderColor: red },
  mark: { fontSize: 9 },
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
const hairline = { width: 100, height: 0.5, fill: 'white', fillOpacity: 0.3 };

const doc = (
  <Document>
    <Page size="A6" style={styles.page} wrap>
      <Text style={[styles.label, { color: red }]}>REACHING THE PAGE EDGE</Text>
      <Text style={styles.intro}>
        Both blocks below are taller than the room left for them. The View is
        breakable, the Svg is not.
      </Text>

      <View style={styles.columns}>
        <View style={{ width: 118 }}>
          <Text style={styles.caption}>BREAKABLE VIEW</Text>
          <Text style={styles.note}>Cut at the edge, resumed overleaf.</Text>
          <View style={styles.band}>
            {rows.map((n) => (
              <View key={n} style={styles.row}>
                <Text style={styles.index}>{String(n).padStart(2, '0')}</Text>
                <Text>table row</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ width: 100 }}>
          <Text style={styles.caption}>UNBREAKABLE SVG</Text>
          <Text style={styles.note}>Cannot be cut, so none of it stays.</Text>
          <Svg width={100} height={336}>
            <Rect width={100} height={336} fill={deep} />
            {rows.map((n) => (
              <Rect key={n} y={n * 24} {...hairline} />
            ))}
            <Text x={10} y={16} fill="white" style={styles.mark}>ONE PIECE</Text>
          </Svg>
        </View>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default breakable_unbreakable;
