import React from 'react';
import { View, StyleSheet } from 'react-pdf';

const Aside = () => (
  <View style={styles.aside}>
    <View style={styles.picture} />
  </View>
);

const styles = StyleSheet.create({
  aside: {
    width: 150,
    padding: 20,
    backgroundColor: '#74949c',
  },
  picture: {
    width: 110,
    height: 110,
    backgroundColor: 'white',
  },
});

export default Aside;
