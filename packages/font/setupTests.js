/* eslint-disable */
import { jest } from '@jest/globals';
import { createRequire } from 'module';

import '../../polyfills';

const require = createRequire(import.meta.url);

global.BROWSER = false;

const customGlobal = global;
customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

jest.setMock('cross-fetch', fetch);
