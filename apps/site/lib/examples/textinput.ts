const textinput = `const UserInformation = () => (
  <View>
    <Text style={styles.heading}>User Information</Text>
    <View style={styles.verticalFlex}>
      <View style={styles.flexGrow}>
        <Text>Username</Text>
        <TextInput
          name="username"
          required
          noSpell
          style={styles.textinput}/>
        <Text>Age</Text>
        <TextInput
          name="age"
          value="18"
          defaultValue="18"
          align="center"
          required
          style={styles.textinput}/>
        <Text>Region</Text>
        <TextInput
          name="region"
          value="Europe"
          align="center"
          readOnly
          style={styles.textinput}/>
      </View>
      <View style={styles.flexGrow}>
        <Text>First name</Text>
        <TextInput
          name="firstname"
          required
          style={styles.textinput}/>
        <Text>Second name</Text>
        <TextInput
          name="secondname"
          style={styles.textinput}/>
        <Text>Last name</Text>
        <TextInput
          name="lastname"
          required
          style={styles.textinput}/>
      </View>
    </View>
    <Text>Description</Text>
    <TextInput
      name="description"
      multiline
      style={[styles.textinput, styles.multiline]}/>
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
  multiline: {
    height: 72
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
      <UserInformation />
    </Page>
  </Document>
);

ReactPDF.render(doc);`;

export default textinput;
