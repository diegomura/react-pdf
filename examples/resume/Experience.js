import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/core';
import Title from './Title';
import List, { Item } from './List';

const styles = StyleSheet.create({
  container: {
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
    <View style={styles.container}>
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

ExperienceEntry.propTypes = {
  company: React.PropTypes.string,
  date: React.PropTypes.string,
  details: React.PropTypes.array,
  position: React.PropTypes.string,
};

export default Experience;
