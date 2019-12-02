import isLink from '../../src/node/isLink';
import {
  VIEW,
  TEXT,
  LINK,
  PAGE,
  NOTE,
  IMAGE,
  DOCUMENT,
  CANVAS,
  TEXT_INSTANCE,
} from '../../src/constants';

describe('node isLink', () => {
  test('Should return false for view', () => {
    const node = { type: VIEW };
    expect(isLink(node)).toBeFalsy();
  });

  test('Should return false for text', () => {
    const node = { type: TEXT };
    expect(isLink(node)).toBeFalsy();
  });

  test('Should return false for link', () => {
    const node = { type: LINK };
    expect(isLink(node)).toBeTruthy();
  });

  test('Should return false for note', () => {
    const node = { type: NOTE };
    expect(isLink(node)).toBeFalsy();
  });

  test('Should return false for image', () => {
    const node = { type: IMAGE };
    expect(isLink(node)).toBeFalsy();
  });

  test('Should return false for document', () => {
    const node = { type: DOCUMENT };
    expect(isLink(node)).toBeFalsy();
  });

  test('Should return false for canvas', () => {
    const node = { type: CANVAS };
    expect(isLink(node)).toBeFalsy();
  });

  test('Should return true for page', () => {
    const node = { type: PAGE };
    expect(isLink(node)).toBeFalsy();
  });

  test('Should return false for text instance', () => {
    const node = { type: TEXT_INSTANCE };
    expect(isLink(node)).toBeFalsy();
  });

  test('Should return trie for text with src prop', () => {
    const node = { type: TEXT, props: { src: '#dest' } };
    expect(isLink(node)).toBeTruthy();
  });

  test('Should return trie for text with href prop', () => {
    const node = { type: TEXT, props: { href: '#dest' } };
    expect(isLink(node)).toBeTruthy();
  });
});
