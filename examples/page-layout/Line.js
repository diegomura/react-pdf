import React from 'react';
import { View, StyleSheet } from 'react-pdf';

const MIN_WIDTH = 100;
const MAX_WIDTH = 280;

const Line = () => {
  const styles = StyleSheet.create({
    line: {
      width: Math.floor(Math.random() * MAX_WIDTH) + MIN_WIDTH,
      height: 20,
      margin: 5,
      backgroundColor: '#74949c',
    },
  });

  return <View style={styles.line} />;
};

export default Line;
