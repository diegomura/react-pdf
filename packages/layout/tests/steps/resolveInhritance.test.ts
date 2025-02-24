/* eslint-disable vitest/expect-expect */

import { describe, expect, test } from 'vitest';

import resolveInheritance from '../../src/steps/resolveInheritance';

describe('layout resolveInheritance', () => {
  const shouldInherit = (prop) => () => {
    const result = resolveInheritance({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { [prop]: 'value' },
          children: [{ type: 'VIEW', props: {}, style: {} }],
        },
      ],
    });
    const view = result.children[0].children[0];

    expect(view.style).toHaveProperty(prop, 'value');
  };

  test('Should not inherit invalid property', () => {
    const result = resolveInheritance({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { backgroundColor: 'value' },
          children: [{ type: 'VIEW', props: {}, style: {} }],
        },
      ],
    });
    const view = result.children[0].children[0];

    expect(view.style).not.toHaveProperty('backgroundColor');
  });

  test('Should not override descendents styles', () => {
    const result = resolveInheritance({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: { color: 'red' },
          children: [{ type: 'VIEW', props: {}, style: { color: 'green' } }],
        },
      ],
    });
    const view = result.children[0].children[0];

    expect(view.style).toHaveProperty('color', 'green');
  });

  test('Should only inherit node descendents', () => {
    const result = resolveInheritance({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          style: {},
          props: {},
          children: [
            { type: 'VIEW', props: {}, style: {} },
            {
              type: 'VIEW',
              props: {},
              style: { color: 'green' },
              children: [{ type: 'VIEW', props: {}, style: {} }],
            },
          ],
        },
      ],
    });

    const view1 = result.children[0].children[0];
    const view2 = result.children[0].children[1];
    const subview = view2.children[0];

    expect(view1.style).not.toHaveProperty('color');
    expect(view2.style).toHaveProperty('color', 'green');
    expect(subview.style).toHaveProperty('color', 'green');
  });

  test('Should inherit multiple textDecoration properly', () => {
    const result = resolveInheritance({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: {},
          children: [
            {
              type: 'TEXT',
              props: {},
              style: { textDecoration: 'line-through' },
              children: [
                {
                  type: 'TEXT',
                  props: {},
                  style: { textDecoration: 'underline' },
                },
              ],
            },
          ],
        },
      ],
    });

    const text1 = result.children[0].children[0];
    const text2 = text1.children[0];

    expect(text1.style).toHaveProperty('textDecoration', 'line-through');
    expect(text2.style).toHaveProperty(
      'textDecoration',
      'line-through underline',
    );
  });

  test('Should inherit background color for text childs', () => {
    const result = resolveInheritance({
      type: 'DOCUMENT',
      props: {},
      children: [
        {
          type: 'PAGE',
          props: {},
          style: {},
          children: [
            {
              type: 'TEXT',
              props: {},
              style: { backgroundColor: 'red' },
              children: [
                {
                  type: 'TEXT',
                  props: {},
                  style: {},
                  children: [{ type: 'TEXT_INSTANCE', value: 'Hello' }],
                },
              ],
            },
          ],
        },
      ],
    });

    const text1 = result.children[0].children[0];
    const text2 = text1.children[0];

    expect(text1.style).toHaveProperty('backgroundColor', 'red');
    expect(text2.style).toHaveProperty('backgroundColor', 'red');
  });

  test('Should inherit color value', shouldInherit('color'));
  test('Should inherit fontFamily value', shouldInherit('fontFamily'));
  test('Should inherit fontSize value', shouldInherit('fontSize'));
  test('Should inherit fontStyle value', shouldInherit('fontStyle'));
  test('Should inherit fontWeight value', shouldInherit('fontWeight'));
  test('Should inherit letterSpacing value', shouldInherit('letterSpacing'));
  test('Should inherit opacity value', shouldInherit('opacity'));
  test('Should inherit textDecoration value', shouldInherit('textDecoration'));
  test('Should inherit textTransform value', shouldInherit('textTransform'));
  test('Should inherit lineHeight value', shouldInherit('lineHeight'));
  test('Should inherit textAlign value', shouldInherit('textAlign'));
  test('Should inherit visibility value', shouldInherit('visibility'));
  test('Should inherit wordSpacing value', shouldInherit('wordSpacing'));
});
