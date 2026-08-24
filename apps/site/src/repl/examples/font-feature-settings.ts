const font_feature_settings = `Font.register({
  family: 'Inter',
  fonts: [
    {
      src: \`fonts/Inter-Regular.ttf\`
    }
  ]
})

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '15pt',
    marginBottom: 16
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 10,
    marginBottom: 4,
    width: '100pt',
  },
  row: {
    fontFamily: 'Inter',
    fontSize: 16,
    marginBottom: 2
  },
  tabularNumbers: {
    fontFamily: 'Inter',
    fontSize: 16,
    marginBottom: 2,
    fontFeatureSettings: ['tnum']
  },
  noKern: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontFeatureSettings: {
      kern: 0
    }
  }
})

const MyDocument = () => (
  <Document>
    <Page>
      <View style={styles.section}>
        <Text style={styles.label}>Default numbers</Text>
        <View>
          <Text style={styles.row}>Invoice #111111 USD 1'111.11</Text>
          <Text style={styles.row}>Invoice #888888 USD 8'888.88</Text>
      	</View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Tabular numbers</Text>
      	<View>
          <Text style={styles.tabularNumbers}>Invoice #111111 USD 1'111.11</Text>
          <Text style={styles.tabularNumbers}>Invoice #888888 USD 8'888.88</Text>
    	</View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Kerning enabled</Text>
        <Text style={styles.row}>AVAVAV Water Layer Drafts</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Kerning disabled</Text>
        <Text style={styles.noKern}>AVAVAV Water Layer Drafts</Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />);
`;

export default font_feature_settings;
