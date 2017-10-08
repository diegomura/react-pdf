import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/core';

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
      <Text style={styles.itemContent}>{children}</Text>
    </View>
  </View>
);

List.propTypes = {
  children: React.PropTypes.node,
};

Item.propTypes = {
  children: React.PropTypes.node,
};

export default List;
