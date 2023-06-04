/**
 * @jest-environment jsdom
 */

/* eslint-disable import/no-extraneous-dependencies */
import { renderHook } from '@testing-library/react';
import usePDF from '../src/dom/usePDF';

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
