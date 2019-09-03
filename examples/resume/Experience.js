import React from 'react';

import Title from './Title';
import List, { Item } from './List';
import { Text, View, StyleSheet } from '../../dist/react-pdf.es.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 15,
    '@media max-width: 400': {
      paddingTop: 10,
      paddingLeft: 0,
    },
  },
  entryContainer: {
    marginBottom: 10,
  },
  date: {
    fontSize: 11,
    fontFamily: 'Lato Italic',
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
    fontFamily: 'Lato',
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  rightColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-end',
    justifySelf: 'flex-end',
  },
  title: {
    fontSize: 11,
    color: 'black',
    textDecoration: 'none',
    fontFamily: 'Lato Bold',
  },
});

const ExperienceEntry = ({ company, details, position, date }) => {
  const title = `${company} | ${position}`;
  return (
    <View style={styles.entryContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.leftColumn}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightColumn}>
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

const experienceData = [
  {
    company: 'Jedi Temple, Coruseant',
    date: 'A long time ago...',
    details: [
      'Started a new Jedi Temple in order to train the next generation of Jedi Masters',
      'Discovered and trained a new generation of Jedi Knights, which he recruited from within the New Republic',
      'Communicates with decesased Jedi Masters such as Anakin Skywalker, Yoda, Obi-Wan Kenobi in order to learn the secrets of the Jedi Order',
    ],
    position: 'Head Jedi Master',
  },
  {
    company: 'Rebel Alliance',
    date: 'A long time ago...',
    details: [
      'Lead legions of troops into battle while demonstrating bravery, competence and honor',
      'Created complicated battle plans in conjunction with other Rebel leaders in order to ensure the greatest chance of success',
      'Defeated Darth Vader in single-combat, and convinced him to betray his mentor, the Emperor',
    ],
    position: 'General',
  },
  {
    company: 'Rebel Alliance',
    date: 'A long time ago...',
    details: [
      'Destroyed the Death Star by using the force to find its only weakness and delivering a torpedo into the center of the ship',
      'Commanded of squadron of X-Wings into battle',
      'Defeated an enemy AT-AT single handedly after his ship was destroyed',
      'Awarded a medal for valor and bravery in battle for his successful destruction of the Death Star',
    ],
    position: 'Lieutenant Commander',
  },
  {
    company: 'Tatooine Moisture Refinery',
    date: 'A long time ago...',
    details: [
      'Replaced damaged power converters',
      'Performed menial labor thoughout the farm in order to ensure its continued operation',
    ],
    position: 'Moisture Farmer',
  },
];

const Experience = () => (
  <View style={styles.container}>
    <Title>Experience</Title>
    {experienceData.map(({ company, date, details, position }) => (
      <ExperienceEntry
        company={company}
        date={date}
        details={details}
        key={company + position}
        position={position}
      />
    ))}
  </View>
);

export default Experience;
