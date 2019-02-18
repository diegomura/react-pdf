/* eslint-disable */
import './polyfills';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
global.BROWSER = false;
global.fetch = require('jest-fetch-mock');
