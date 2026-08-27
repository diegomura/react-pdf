const font_feature_settings = `Font.register({
  family: 'Inter',
  src: '/fonts/Inter-Regular.ttf',
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 14,
    padding: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  label: {
    width: 130,
    fontSize: 9,
    color: '#71717a',
    textTransform: 'uppercase',
  },
  tabular: {
    fontFeatureSettings: ['tnum'],
  },
  noKerning: {
    fontFeatureSettings: { kern: 0 },
  },
});

const MyDocument = () => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.row}>
        <Text style={styles.label}>Default figures</Text>
        <View>
          <Text>Invoice 111,111.11</Text>
          <Text>Invoice 888,888.88</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>tnum</Text>
        <View style={styles.tabular}>
          <Text>Invoice 111,111.11</Text>
          <Text>Invoice 888,888.88</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Default kerning</Text>
        <Text>AVATAR Wave Today</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>kern: 0</Text>
        <Text style={styles.noKerning}>AVATAR Wave Today</Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />);
`;

export default font_feature_settings;
