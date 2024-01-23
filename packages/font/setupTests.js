/* eslint-disable */
import { vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

import '../../polyfills';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

global.BROWSER = false;

vi.mock('cross-fetch', () => ({ default: global.fetch }));
