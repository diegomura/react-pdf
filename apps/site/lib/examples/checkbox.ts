const checkbox = `const Multichoice = () => {
  const currentYear = new Date().getYear()+1900;
  return (
    <View>
      <Text style={styles.heading}>Questions</Text>
      <Question answers={['Flask', 'ReactPDF', 'SolidJS', 'Spring Boot']} name="technology">
        Which technology is used to generate this pdf?
      </Question>
      <Question answers={[currentYear+1, currentYear-2, currentYear, currentYear-1]} name="year">
        What year is it?
      </Question>
      <Question answers={['MacOS', 'TempleOS', 'Windows', 'Ubuntu']} name="os">
        What operating system was developed by Apple?
      </Question>
      <Question answers={['Software', 'Construction', 'Hardware', 'Agriculture']} name="ram">
        Where does RAM get used?
      </Question>
      
      <FreeSpace free={250}/>
      <FieldSet style={[styles.inlineFlex, styles.break]} name="read">
          <Text>I have read all the questions above: </Text>
          <Checkbox checked required style={styles.checkbox} />
      </FieldSet>
      <FieldSet style={[styles.inlineFlex, styles.break]} name="knowledge">
          <Text>I only used my own knowledge to answer the questions: </Text>
          <Checkbox required style={styles.checkbox} />
      </FieldSet>
    </View>
  )
};

const Question = (props) => (
  <FieldSet name={props.name} style={styles.break}>
    <Text style={[styles.question, styles.break]}>{props.children}</Text>
  	<Answers choices={props.answers}/>
  </FieldSet>
)

const Answers = (props) => (
  <View style={styles.verticalFlex}>
    {
      props.choices.map(choice => (
        <View style={styles.verticalFlex}>
          <Text>{choice} </Text>
          <Checkbox name={choice} style={styles.checkbox} />
        </View>
      ))
    }
  </View>
)

const FreeSpace = (props) => <View style={{marginTop: props.free}}/>

const styles = StyleSheet.create({
  page: {
    padding: 60
  },
  checkbox: {
    height: 20,
    width: 20
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 40
  },
  question: {
    fontSize: 20
  },
  break: {
    marginBottom: 10
  },
  verticalFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  inlineFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <Multichoice />
    </Page>
  </Document>
);

ReactPDF.render(doc);`;

export default checkbox;
