/* eslint react/prop-types: 0 */

import React from 'react';
import { View, StyleSheet } from '@react-pdf/core';

const Body = ({ children }) => (
  <View style={styles.body}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
});

export default Body;
