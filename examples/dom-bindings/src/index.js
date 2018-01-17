import 'babel-polyfill'; // to fix `regeneratorRuntime is not defined`, which causes by `@react-pdf/*`
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
