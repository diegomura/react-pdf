import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from '@react-pdf/core';

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Lato Bold',
    fontSize: 14,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
});

const Title = ({ children }) => <Text style={styles.title}>{children}</Text>;

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;
