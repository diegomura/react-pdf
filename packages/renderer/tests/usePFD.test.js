/**
 * @jest-environment jsdom
 */

/* eslint-disable import/no-extraneous-dependencies */
import { renderHook } from '@testing-library/react';
import { usePDF } from '..';

it('creates a router object on demand', () => {
  const { result } = renderHook(() => usePDF());
  console.log(result);
  expect(result.current).toBeInstanceOf(Object);
});
