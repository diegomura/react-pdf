/* eslint react/prop-types: 0 */

import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/core';

const Header = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.text}>
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 100,
    padding: 10,
    backgroundColor: '#395b7d',
  },
  text: {
    color: 'white',
  },
});

export default Header;
