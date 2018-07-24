import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';
import List, { Item } from './List';
import { Text, View, StyleSheet } from '../../dist/react-pdf.es.js';

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Lato Bold',
    fontSize: 11,
    marginBottom: 10,
  },
  skills: {
    fontFamily: 'Lato',
    fontSize: 10,
    marginBottom: 10,
  },
});

const SkillEntry = ({ name, skills }) => (
  <View>
    <Text style={styles.title}>{name}</Text>
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

SkillEntry.propTypes = {
  name: PropTypes.string,
  skills: PropTypes.array,
};

export default Skills;
