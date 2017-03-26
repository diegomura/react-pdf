import React, { Component } from 'react';
import './App.css';

import { Document } from 'react-pdf-dom';
import { View, Text, Page, StyleSheet } from 'react-pdf';

// import lorem from './lorem';

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
          <Document>
            <Page size="A4">
              <View style={styles.container}>
                <Text>
                  Dit is tekst
                </Text>
                <View style={styles.block}>
                  <Text>
                    Dit is nog meer tekst
                  </Text>
                </View>
              </View>
            </Page>
            {/* <document>
              <page margin={50}>
                {/* <image
                  src={require('./images/react.png')}
                  width={200}
                  x={200}
                  y={300}
                />
                <text align="center" underline>
                  ~ Lorem ipsum ~
                </text>
                <text align="justify" columnGap={15} columns={3}>
                  {lorem}
                </text>
              </page>
            </document> */}
          </Document>
        </p>
      </div>
    );
  }
}

export default App;
