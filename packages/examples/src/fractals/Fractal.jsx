import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const palette = [
  '#781c81',
  '#521b80',
  '#442f8b',
  '#3f4c9f',
  '#4069b4',
  '#4582c1',
  '#4e96bd',
  '#5aa6a9',
  '#68b090',
  '#7ab878',
  '#8dbc64',
  '#a2be56',
  '#b7bd4b',
  '#c9b843',
  '#d8ae3d',
  '#e29e37',
  '#e78632',
  '#e6672d',
  '#e14427',
  '#d92120',
];

const styles = StyleSheet.create({
  row: {
    flexGrow: 1,
    width: '100%',
    flexDirection: 'row',
  },
  column: {
    flexGrow: 1,
    height: '100%',
    flexDirection: 'column',
  },
  text: {
    margin: 10,
    fontSize: 10,
    color: 'white',
  },
});

const toggle = (direction) => (direction === 'column' ? 'row' : 'column');

const Fractal = ({ steps, direction = 'column' }) => {
  if (steps === 0) {
    return null;
  }

  const fractalStyle = {
    flexGrow: 1,
    minWidth: 40,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette[steps % palette.length],
  };

  return (
    <View style={styles[direction]}>
      <Fractal direction={toggle(direction)} steps={steps - 1} />
      <View style={fractalStyle}>
        <Text style={styles.text}>{steps}</Text>
      </View>
    </View>
  );
};

export default Fractal;
