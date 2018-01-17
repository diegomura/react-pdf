import React, { Component } from 'react';
import { Document } from '@react-pdf/dom';
import { View, Text, Page, StyleSheet } from '@react-pdf/core';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  block: {
    maxHeight: 200,
    maxWidth: 400,
    flex: 1,
  },
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React PDF</h2>
        </div>
        <p className="App-intro">
          <Document height="100%" width="100%">
            <Page size="A4">
              <View style={styles.container}>
                <Text>Text</Text>
                <View style={styles.block}>
                  <Text>More text</Text>
                </View>
              </View>
            </Page>
            <Page size="A4">
              <View style={styles.container}>
                <Text>Text</Text>
                <View style={styles.block}>
                  <Text>More text</Text>
                </View>
              </View>
            </Page>
          </Document>
        </p>
      </div>
    );
  }
}

export default App;
