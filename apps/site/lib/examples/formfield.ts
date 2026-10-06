const formfield = `const Address = (props) => (
  <FieldSet name={props.name.toLowerCase()}>
    <Text style={styles.heading}>{props.name}</Text>
    <Text>Street</Text>
    <TextInput
      name="street"
      noSpell
      required={props.required}
      style={styles.textinput}/>
    <Text>House Nr.</Text>
    <TextInput
      name="house"
      noSpell
      required={props.required}
      style={styles.textinput}/>
    <Text>Postal code</Text>
    <TextInput
      name="postal-code"
      noSpell
      required={props.required}
      style={styles.textinput}/>
    <Text>City</Text>
    <TextInput
      name="city"
      noSpell
      required={props.required}
      style={styles.textinput}/>
    <Text>Country</Text>
    <TextInput
      name="country"
      noSpell
      required={props.required}
      style={styles.textinput}/>
  </FieldSet>
)

const Invoice = () => (
  <View>
    <Text style={styles.heading}>Invoice</Text>
    <View style={styles.verticalFlex}>
      <View style={styles.flexGrow}>
        <Address name="Billing" required/>
      </View>
      <View style={styles.flexGrow}>
        <Address name="Shipping"/>
      </View>
    </View>
    
    <Text>Name of Product</Text>
    <TextInput
      name="product"
      noSpell
      required
      style={styles.textinput}/>
  </View>
);

const styles = StyleSheet.create({
  page: {
    padding: 60
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 40
  },
  textinput: {
    height: 14.4,
    marginRight: 50,
    marginTop: 10,
    marginBottom: 20
  },
  verticalFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  flexGrow: {
    flexGrow: 1
  }
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <Invoice />
    </Page>
  </Document>
);

ReactPDF.render(doc);`;

export default formfield;
