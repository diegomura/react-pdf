import { describe, expect, test } from 'vitest';

import resolvePagePaddings from '../../src/steps/resolvePagePaddings';

describe('layout resolvePagePaddings', () => {
  test('Should keep other styles untouched', () => {
    const result = resolvePagePaddings({
      type: 'DOCUMENT',
      props: {},
      children: [{ type: 'PAGE', props: {}, style: { color: 'red' } }],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should leave numeric paddingTop as it is', () => {
    const result = resolvePagePaddings({
      type: 'DOCUMENT',
      props: {},
      children: [{ type: 'PAGE', props: {}, style: { paddingTop: 50 } }],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should leave numeric paddingRight as it is', () => {
    const result = resolvePagePaddings({
      type: 'DOCUMENT',
      props: {},
      children: [{ type: 'PAGE', props: {}, style: { paddingRight: 50 } }],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should leave numeric paddingBottom as it is', () => {
    const result = resolvePagePaddings({
      type: 'DOCUMENT',
      props: {},
      children: [{ type: 'PAGE', props: {}, style: { paddingBottom: 50 } }],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should leave numeric paddingLeft as it is', () => {
    const result = resolvePagePaddings({
      type: 'DOCUMENT',
      props: {},
      children: [{ type: 'PAGE', props: {}, style: { paddingLeft: 50 } }],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should resolve percent paddingTop', () => {
    const result = resolvePagePaddings({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { paddingTop: '10%' as any, width: 100, height: 200 },
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should resolve percent paddingRight', () => {
    const result = resolvePagePaddings({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { paddingRight: '10%' as any, width: 100, height: 200 },
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should resolve percent paddingBottom', () => {
    const result = resolvePagePaddings({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { paddingBottom: '10%' as any, width: 100, height: 200 },
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should resolve percent paddingLeft', () => {
    const result = resolvePagePaddings({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { paddingLeft: '10%' as any, width: 100, height: 200 },
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });

  test('Should resolve several pages', () => {
    const result = resolvePagePaddings({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { paddingTop: 10, width: 100, height: 200 },
        },
        {
          type: 'PAGE',
          props: {},
          style: { paddingBottom: '10%' as any, width: 100, height: 200 },
        },
        {
          type: 'PAGE',
          props: {},
          style: {
            paddingRight: 10,
            paddingLeft: '10%' as any,
            width: 100,
            height: 200,
          },
        },
      ],
    });

    expect(result).toMatchSnapshot();
  });
});
