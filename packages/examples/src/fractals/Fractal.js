/* eslint react/prop-types: 0 */

import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

import palette from './palette';

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

const toggle = direction => (direction === 'column' ? 'row' : 'column');

// Creates Fractal Component that renders it's step with a background color
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
    backgroundColor: palette[steps],
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
