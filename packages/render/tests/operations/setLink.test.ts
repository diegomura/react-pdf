import { describe, expect, test } from 'vitest';

import * as P from '@react-pdf/primitives';
import { SafeNode } from '@react-pdf/layout';

import createCTX from '../ctx';
import setLink from '../../src/operations/setLink';

const box = { top: 10, left: 20, width: 100, height: 30 };

const renderLink = (src: string) => {
  const ctx = createCTX();
  const doc = { type: P.Link, style: {}, props: { src }, box } as SafeNode;

  setLink(ctx, doc);

  return ctx;
};

describe('operations setLink', () => {
  test('should add a link with the node box', () => {
    const ctx = renderLink('https://react-pdf.org');

    expect(ctx.link.mock.calls).toHaveLength(1);
    expect(ctx.link.mock.calls[0]).toEqual([
      20,
      10,
      100,
      30,
      'https://react-pdf.org',
    ]);
  });

  test('should percent-encode non-ASCII characters in the link', () => {
    const ctx = renderLink('https://example.com/a—b?q=ñ');

    expect(ctx.link.mock.calls[0][4]).toBe(
      'https://example.com/a%E2%80%94b?q=%C3%B1',
    );
  });

  test('should keep already encoded links unchanged', () => {
    const ctx = renderLink('https://example.com/a%E2%80%94b?q=1&r=a%20b');

    expect(ctx.link.mock.calls[0][4]).toBe(
      'https://example.com/a%E2%80%94b?q=1&r=a%20b',
    );
  });

  test('should go to destination for id links without encoding', () => {
    const ctx = renderLink('#section');

    expect(ctx.link.mock.calls).toHaveLength(0);
    expect(ctx.goTo.mock.calls[0][4]).toBe('section');
  });
});
