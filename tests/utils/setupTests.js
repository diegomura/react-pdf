/* eslint-disable */
import './polyfills';

import Enzyme from 'enzyme';
import fetchMock from 'jest-fetch-mock';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
global.fetch = fetchMock;
global.BROWSER = false;
