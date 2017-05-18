import React from 'react';
import { View, StyleSheet } from 'react-pdf';

const Footer = () => <View style={styles.footer} />;

const styles = StyleSheet.create({
  footer: {
    height: 80,
    padding: 10,
    backgroundColor: '#2d4677',
  },
});

export default Footer;
