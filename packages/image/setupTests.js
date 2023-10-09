/* eslint-disable import/no-extraneous-dependencies */
import { jest } from '@jest/globals';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const customGlobal = global;
customGlobal.fetch = require('jest-fetch-mock');

customGlobal.fetchMock = customGlobal.fetch;
global.BROWSER = false;

jest.setMock('cross-fetch', fetch);
