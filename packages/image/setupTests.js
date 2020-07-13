/* eslint-disable */
import '../../polyfills';

global.BROWSER = false;

const customGlobal = global;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

jest.setMock('cross-fetch', fetch);
