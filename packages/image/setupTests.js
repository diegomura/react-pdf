/* eslint-disable import/no-extraneous-dependencies */

const customGlobal = global;
customGlobal.fetch = require('jest-fetch-mock');

customGlobal.fetchMock = customGlobal.fetch;
global.BROWSER = false;

jest.setMock('cross-fetch', fetch);
