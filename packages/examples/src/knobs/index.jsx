import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  select: {
    height: '9%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '30px',
  },
  bar: {
    flexGrow: 1,
    height: '10px',
    backgroundColor: 'gray',
  },
  barMiddle: {
    width: '50%',
    height: '100%',
    backgroundColor: 'lightgray',
    margin: 'auto',
  },
  knob: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'orange',
    position: 'absolute',
    backgroundColor: 'white',
    fontSize: 8,
    top: -6,
  },
  text: {
    fontSize: 10,
  },
});

const Knob = ({ value }) => (
  <View style={[styles.knob, { left: `${value - 3}%` }]}>
    <Text style={{ fontSize: 8 }}>{value}</Text>
  </View>
);

const Select = props => (
  <View style={styles.select}>
    <Text style={[styles.text, { marginRight: '15px' }]}>0%</Text>
    <View style={styles.bar}>
      <View style={styles.barMiddle} />
      <Knob {...props} />
    </View>
    <Text style={[styles.text, { marginLeft: '15px' }]}>100%</Text>
  </View>
);

const Knobs = () => (
  <Document>
    <Page size="A5">
      <Select value={0} />
      <Select value={10} />
      <Select value={20} />
      <Select value={30} />
      <Select value={40} />
      <Select value={50} />
      <Select value={60} />
      <Select value={70} />
      <Select value={80} />
      <Select value={90} />
      <Select value={100} />
    </Page>
  </Document>
);

export default Knobs
