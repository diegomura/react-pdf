import React, { Component } from 'react';
import './App.css';

import { Document } from 'react-pdf-dom';
import lorem from './lorem';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React PDF</h2>
        </div>
        <p className="App-intro">
          <Document>
            <document>
              <page margin={50}>
                {/* <image
                  src={require('./images/react.png')}
                  width={200}
                  x={200}
                  y={300}
                /> */}
                <text align="center" underline>
                  ~ Lorem ipsum ~
                </text>
                <text align="justify" columnGap={15} columns={3}>
                  {lorem}
                </text>
              </page>
            </document>
          </Document>
        </p>
      </div>
    );
  }
}

export default App;
