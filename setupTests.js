/* eslint-disable */
import './polyfills';

import fetchMock from 'jest-fetch-mock';

global.BROWSER = false;

fetchMock.enableMocks();
