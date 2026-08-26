const shapeOutside = `const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Times-Roman',
  },
  section: {
    marginBottom: 16,
    // floats don't grow their parent, so reserve the artwork's height
    minHeight: 150,
  },
  label: {
    fontFamily: 'Courier',
    fontSize: 9,
    color: '#4069b4',
    marginBottom: 6,
  },
  text: {
    textAlign: 'justify',
  },
});

const circleText =
  'A circle exclusion is widest across its middle, so the lines beside it ' +
  'grow shorter down to the equator and then open back up, and the ' +
  'paragraph recovers the full measure only once it clears the bottom of ' +
  'the shape. The float box here is 130pt square while the drawn circle is ' +
  'only 100pt across: shape-margin has no equivalent in react-pdf, and ' +
  'side margins stop widening the exclusion once a shape is set, so the ' +
  'extra 15pt of empty box on each side is what keeps the text off the ' +
  'artwork. Make the box bigger than the shape whenever you want ' +
  'breathing room, or shrink ' +
  'the radius and leave the box alone. Below the circle the exclusion is ' +
  'over and the lines run the full width of the page again.';

const polygonText =
  'A polygon takes the same comma-separated coordinate pairs as CSS, each ' +
  'resolved against the float box, and every line is measured against the ' +
  'real edge rather than the bounding rectangle. This wedge is a point at ' +
  'the top and the full width of the box at the bottom, so the first lines ' +
  'run nearly to the right margin and each one after gives back a little ' +
  'more room to the diagonal. Any convex or concave outline works the same ' +
  'way, which is what makes polygons the practical choice for wrapping ' +
  'text around a cut-out illustration, a logo or a chart with an irregular ' +
  'silhouette. Coordinates may be lengths as well, so the same wedge could ' +
  'be written as polygon(130 0, 130 130, 0 130) when the float box has a ' +
  'fixed size and you would rather think in points.';

const ellipseText =
  'An ellipse takes two radii instead of one, so you can flatten or ' +
  'stretch the exclusion independently of the box, and inset() carves a ' +
  'rectangle in from the edges of the float box. Radii and offsets accept ' +
  'lengths or percentages, percentages resolve against the box, and both ' +
  'shapes can be moved with the at keyword exactly like their CSS ' +
  'counterparts. When a value cannot be parsed the property is dropped and ' +
  'text falls back to wrapping around the plain rectangular box, which is ' +
  'also what happens for shapes react-pdf does not support, such as ' +
  'url() references, so a typo costs you the curve and never the ' +
  'paragraph.';

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <View style={styles.section}>
        <Text style={styles.label}>circle(50%)</Text>
        <View
          style={{
            float: 'left',
            width: 130,
            height: 130,
            shapeOutside: 'circle(50%)',
          }}
        >
          <Svg width={130} height={130}>
            <Circle cx={65} cy={65} r={50} fill="#55987a" />
          </Svg>
        </View>
        <Text style={styles.text}>{circleText}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>polygon(100% 0, 100% 100%, 0 100%)</Text>
        <View
          style={{
            float: 'right',
            width: 130,
            height: 130,
            shapeOutside: 'polygon(100% 0, 100% 100%, 0 100%)',
          }}
        >
          <Svg width={130} height={130}>
            <Polygon points="130,0 130,130 0,130" fill="#c25b56" />
          </Svg>
        </View>
        <Text style={styles.text}>{polygonText}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>ellipse(50% 40% at center)</Text>
        <View
          style={{
            float: 'left',
            width: 130,
            height: 120,
            shapeOutside: 'ellipse(50% 40% at center)',
          }}
        >
          <Svg width={130} height={120}>
            <Ellipse cx={65} cy={60} rx={55} ry={43} fill="#4069b4" />
          </Svg>
        </View>
        <Text style={styles.text}>{ellipseText}</Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default shapeOutside;
