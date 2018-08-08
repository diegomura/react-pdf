import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from '../../dist/react-pdf.es.js';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  itemLeftColumn: {
    flexDirection: 'column',
    marginRight: 10,
  },
  itemRightColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  bulletPoint: {
    fontSize: 10,
  },
  itemContent: {
    fontSize: 10,
    fontFamily: 'Lato',
  },
});

const List = ({ children }) => children;

export const Item = ({ children }) => (
  <View style={styles.item}>
    <View style={styles.itemLeftColumn}>
      <Text style={styles.bulletPoint}>•</Text>
    </View>
    <View style={styles.itemRightColumn}>
      <Text log style={styles.itemContent}>
        {children}
      </Text>
    </View>
  </View>
);

List.propTypes = {
  children: PropTypes.node,
};

Item.propTypes = {
  children: PropTypes.node,
};

export default List;
