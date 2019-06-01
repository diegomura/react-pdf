import isTextInstance from '../../src/node/isTextInstance';
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

describe('node isTextInstance', () => {
  test('Should return false for view', () => {
    const node = { type: VIEW };
    expect(isTextInstance(node)).toBeFalsy();
  });

  test('Should return false for text', () => {
    const node = { type: TEXT };
    expect(isTextInstance(node)).toBeFalsy();
  });

  test('Should return false for link', () => {
    const node = { type: LINK };
    expect(isTextInstance(node)).toBeFalsy();
  });

  test('Should return false for note', () => {
    const node = { type: NOTE };
    expect(isTextInstance(node)).toBeFalsy();
  });

  test('Should return false for image', () => {
    const node = { type: IMAGE };
    expect(isTextInstance(node)).toBeFalsy();
  });

  test('Should return false for document', () => {
    const node = { type: DOCUMENT };
    expect(isTextInstance(node)).toBeFalsy();
  });

  test('Should return false for canvas', () => {
    const node = { type: CANVAS };
    expect(isTextInstance(node)).toBeFalsy();
  });

  test('Should return true for page', () => {
    const node = { type: PAGE };
    expect(isTextInstance(node)).toBeFalsy();
  });

  test('Should return false for text instance', () => {
    const node = { type: TEXT_INSTANCE };
    expect(isTextInstance(node)).toBeTruthy();
  });
});
