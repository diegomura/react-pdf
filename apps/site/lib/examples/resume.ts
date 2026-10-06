const resume = `Font.register({ family: 'Lato', src: 'https://raw.githubusercontent.com/google/fonts/main/ofl/lato/Lato-Regular.ttf' });

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    '@media max-width: 400': {
      flexDirection: 'column',
    },
  },
  image: {
    marginBottom: 10,
    '@media max-width: 400': {
      width: 290,
    },
  },
  title: {
    fontSize: 14,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  leftColumn: {
    flexDirection: 'column',
    width: 170,
    marginLeft: 30,
    marginRight: 15,
    marginTop: 20,
    '@media max-width: 400': {
      width: 290,
      marginRight: 30,
    },
    '@media orientation: landscape': {
      width: 200,
      marginRight: 50,
    },
  },
  rightColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    marginLeft: 15,
    marginRight: 30,
    marginTop: 20,
    '@media max-width: 400': {
      marginTop: 10,
      marginLeft: 30,
    },
  },
  footer: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 25,
    marginHorizontal: 30,
    paddingVertical: 10,
    borderWidth: 3,
    borderColor: 'gray',
    borderStyle: 'dashed',
    '@media orientation: landscape': {
      marginTop: 10,
    },
  },
  item: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  itemLeftColumn: {
    flexDirection: 'column',
    marginRight: 10,
  },
  itemRightColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  bulletPoint: {
    fontSize: 10,
  },
  itemContent: {
    fontSize: 10,
    fontFamily: 'Lato',
  },
  headerContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  linkColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  name: {
    fontSize: 24,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 10,
    justifySelf: 'flex-end',
    textTransform: 'uppercase',
  },
  link: {
    fontSize: 10,
    color: 'black',
    textDecoration: 'none',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  educationContainer: {
    marginBottom: 10,
  },
  school: {
    fontSize: 10,
  },
  degree: {
    fontSize: 10,
  },
  candidate: {
    fontSize: 10,
  },
  skillTitle: {
    fontSize: 11,
    marginBottom: 10,
  },
  skills: {
    fontSize: 10,
    marginBottom: 10,
  },
  experienceContainer: {
    marginBottom: 10,
  },
  date: {
    fontSize: 11,
  },
  detailContainer: {
    flexDirection: 'row',
  },
  detailLeftColumn: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },
  detailRightColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  bulletPoint: {
    fontSize: 10,
  },
  details: {
    fontSize: 10,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  experienceLeftColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  experienceRightColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-end',
    justifySelf: 'flex-end',
  },
  experienceTitle: {
    fontSize: 11,
    color: 'black',
    textDecoration: 'none',
  },
});

const Header = () => (
  <View style={styles.headerContainer}>
    <View style={styles.detailColumn}>
      <Text style={styles.name}>Luke Skywalker</Text>
      <Text style={styles.subtitle}>Jedi Master</Text>
    </View>
    <View style={styles.linkColumn}>
      <Link style={styles.link}>luke@theforce.com</Link>
    </View>
  </View>
);

const Title = ({ children }) => <Text style={styles.title}>{children}</Text>;

const List = ({ children }) => children;

const Item = ({ children }) => (
  <View style={styles.item}>
    <View style={styles.itemLeftColumn}>
      <Text style={styles.bulletPoint}>•</Text>
    </View>
    <View style={styles.itemRightColumn}>
      <Text style={styles.itemContent}>{children}</Text>
    </View>
  </View>
);

const Education = () => (
  <View style={styles.educationContainer}>
    <Title>Education</Title>
    <Text style={styles.school}>Jedi Academy</Text>
    <Text style={styles.degree}>Jedi Master</Text>
    <Text style={styles.candidate}>A long, long time ago</Text>
  </View>
);

const SkillEntry = ({ name, skills }) => (
  <View>
    <Text style={styles.skillTitle}>{name}</Text>
    <List>{skills.map((skill, i) => <Item key={i}>{skill}</Item>)}</List>
  </View>
);

const Skills = () => (
  <View>
    <Title>Skills</Title>
    <SkillEntry
      name="Combat Abilities"
      skills={[
        'Completed Jedi Master training and built a lightsaber from scratch in order to do battle against the Empire',
        'Defeated the Rancor and rescued Princess Leia from Jabba the Hutt',
        'Competent fighter pilot as well as an excelent shot with nearly any weapon',
      ]}
    />
  </View>
);

const ExperienceEntry = ({ company, details, position, date }) => {
  const title = \`\${company} | \${position}\`;
  return (
    <View style={styles.experienceContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.experienceLeftColumn}>
          <Text style={styles.experienceTitle}>{title}</Text>
        </View>
        <View style={styles.experneiceRightColumn}>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <List>
        {details.map((detail, i) => (
          <Item key={i} style={styles.detailContainer}>
            {detail}
          </Item>
        ))}
      </List>
    </View>
  );
};

const Experience = () => (
  <View>
    <Title>Experience</Title>
    <ExperienceEntry
      company="Jedi Temple, Coruseant"
      date="A long, long time ago"
      details={[
        'Started a new Jedi Temple in order to train the next generation of Jedi Masters',
        'Discovered and trained a new generation of Jedi Knights, which he recruited from within the New Republic',
        'Comunees with decesased Jedi Masters such as Anakin Skywalker, Yoda, Obi-Wan Kenobi in order to learn the secrets of the Jedi Order',
      ]}
      position="Head Jedi Master"
    />
    <ExperienceEntry
      company="Revel Alliance"
      date="A long, long time ago"
      details={[
        'Lead legions of troops into battle while demostrating bravery, competence and honor',
        'Created complicated battle plans in conjunction with other Rebel leaders in order to ensure the greatest chance of success',
        'Defeated Darth Vader in single-combat, and convinced him to betray his mentor, the Emperor',
      ]}
      position="General"
    />
    <ExperienceEntry
      company="Revel Alliance"
      date="A long, long time ago"
      details={[
        'Destroyed the Death Star by using the force to find its only weakness and delivering a torpedo into the center of the ship',
        'Commander of squadron of TIE-fighters into battle',
        'Defeated an enemy AT-AT single handedly after his ship was destroyed',
        'Awarded a medal for valor and bravery in battle for his successful destruction of the Death Star',
      ]}
      position="Lieutenant Commander"
    />
    <ExperienceEntry
      company="Tatooine Moisture Refinery"
      date="A long, long time ago"
      details={[
        'Replaced damaged power convereters',
        'Performed menial labor thoughout the farm in order to ensure its continued operation',
      ]}
      position="Mousture Farmer"
    />
  </View>
);

const resume = (
  <Page size="A4">
    <Header />
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image
          src="/images/luke.jpg"
          style={styles.image}
        />
        <Education />
        <Skills />
      </View>
      <View style={styles.rightColumn}>
        <Experience />
      </View>
    </View>
    <Text style={styles.footer}>This IS the candidate you are looking for</Text>
  </Page>
);

ReactPDF.render(resume);
`;

export default resume;
