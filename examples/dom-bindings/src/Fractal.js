/* eslint react/prop-types: 0 */

import React from 'react';
import { Text, View } from '@react-pdf/react-pdf';
import styles from './styles';
import palette from './palette';

const toggle = direction => (direction === 'column' ? 'row' : 'column');

// Creates Fractal Component that renders it's step with a background color
const Fractal = ({ steps, direction = 'column' }) => {
  if (steps === 0) {
    return null;
  }

  const fractalStyle = {
    flexGrow: 1,
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
