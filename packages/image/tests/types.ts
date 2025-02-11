/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */

import Global = NodeJS.Global;

import type { Mock } from 'vitest';

declare global {
  const fetchMock: FetchMock;
  namespace NodeJS {
    interface Global {
      fetch: FetchMock;
    }
  }
}

export interface GlobalWithFetchMock extends Global {
  fetchMock: FetchMock;
  fetch: FetchMock;
}

export interface FetchMock
  extends Mock<
    [string | Request | undefined, RequestInit | undefined],
    Promise<Response>
  > {
  (input: string | Request, init?: RequestInit): Promise<Response>;

  /**
   * Response mocking
   */
  mockResponse(value: Buffer): FetchMock;
  mockResponse(fn: MockResponseInitFunction): FetchMock;
  mockResponse(response: string, responseInit?: MockParams): FetchMock;

  /**
   * alias for mockResponseOnce
   */
  once(value: Buffer): FetchMock;
  once(fn: MockResponseInitFunction): FetchMock;
  once(url: string, responseInit?: MockParams): FetchMock;

  /**
   * Returns all the requests that have been made to the mocked fetch function.
   * Does not include aborted requests.
   */
  requests(): Request[];

  resetMocks(): void;
  enableMocks(): void;
  disableMocks(): void;
}

export interface MockParams {
  status?: number;
  statusText?: string;
  headers?: string[][] | { [key: string]: string }; // HeadersInit
  url?: string;
  /** Set >= 1 to have redirected return true. Only applicable to Node.js */
  counter?: number;
}

export interface MockResponseInit extends MockParams {
  body?: string;
  init?: MockParams;
}

export type ErrorOrFunction = Error | ((...args: any[]) => Promise<any>);
export type UrlOrPredicate = string | RegExp | ((input: Request) => boolean);

export type MockResponseInitFunction = (
  request: Request,
) => MockResponseInit | string | Promise<MockResponseInit | string>;

declare const fetchMock: FetchMock;
