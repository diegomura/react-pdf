/* eslint-disable import/no-extraneous-dependencies */
import { vi } from 'vitest';
import createFetchMock from 'vitest-fetch-mock';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

global.BROWSER = false;

vi.mock('cross-fetch', () => ({ default: global.fetch }));
