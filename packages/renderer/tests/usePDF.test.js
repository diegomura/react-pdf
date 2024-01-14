/**
 * @jest-environment ./tests/environment/jsdom.js
 */

/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { renderHook, waitFor, act } from '@testing-library/react';
import { usePDF, Document, Page, Text } from '../src/dom';

const TestDocument = ({ title = 'Default' }) => (
  <Document title={title}>
    <Page>
      <Text>Hello tests</Text>
    </Page>
  </Document>
);

it('returns value, updater tuple', () => {
  const { result } = renderHook(() => usePDF({ document: undefined }));

  expect(Array.isArray(result.current)).toBeTruthy();
  expect(result.current[0]).toMatchObject(
    expect.objectContaining({
      url: null,
      blob: null,
      error: null,
      loading: false,
    }),
  );

  expect(typeof result.current[1]).toBe('function');
});

it('works with no args', () => {
  const { result } = renderHook(() => usePDF());

  expect(Array.isArray(result.current)).toBeTruthy();
  expect(typeof result.current[0]).toBe('object');
  expect(typeof result.current[1]).toBe('function');
});

it('renders document', async () => {
  const { result } = renderHook(() => usePDF({ document: <TestDocument /> }));

  await waitFor(() => expect(result.current[0].loading).toBeFalsy());
});

it('updates document', async () => {
  const { result } = renderHook(() => usePDF({ document: <TestDocument /> }));

  await waitFor(() => expect(result.current[0].loading).toBeFalsy());

  const pdfSize = result.current[0].blob.size;

  act(() => result.current[1](<TestDocument title="Long long long title" />));

  await waitFor(() => expect(result.current[0].loading).toBeFalsy());

  expect(result.current[0].blob.size).not.toEqual(pdfSize);
});

it('backward compatible with previous hook', async () => {
  const { result } = renderHook(() => {
    const [document, setDoc] = useState(() => <TestDocument />);
    const [instance, update] = usePDF({ document });

    useEffect(update, [document]);

    return [
      instance,
      () => setDoc(<TestDocument title="Long long long title" />),
    ];
  });

  await waitFor(() => expect(result.current[0].loading).toBeFalsy());

  const pdfSize = result.current[0].blob.size;

  act(() => result.current[1]());

  await waitFor(() => expect(result.current[0].loading).toBeFalsy());

  expect(result.current[0].blob.size).not.toEqual(pdfSize);
});
