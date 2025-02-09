import { vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

import '../../polyfills';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

global.BROWSER = false;
