import isDocument from '../../src/node/isDocument';
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

describe('node isDocument', () => {
  test('Should return false for view', () => {
    const node = { type: VIEW };
    expect(isDocument(node)).toBeFalsy();
  });

  test('Should return false for text', () => {
    const node = { type: TEXT };
    expect(isDocument(node)).toBeFalsy();
  });

  test('Should return false for link', () => {
    const node = { type: LINK };
    expect(isDocument(node)).toBeFalsy();
  });

  test('Should return false for note', () => {
    const node = { type: NOTE };
    expect(isDocument(node)).toBeFalsy();
  });

  test('Should return false for image', () => {
    const node = { type: IMAGE };
    expect(isDocument(node)).toBeFalsy();
  });

  test('Should return false for document', () => {
    const node = { type: DOCUMENT };
    expect(isDocument(node)).toBeTruthy();
  });

  test('Should return false for canvas', () => {
    const node = { type: CANVAS };
    expect(isDocument(node)).toBeFalsy();
  });

  test('Should return true for page', () => {
    const node = { type: PAGE };
    expect(isDocument(node)).toBeFalsy();
  });

  test('Should return false for text instance', () => {
    const node = { type: TEXT_INSTANCE };
    expect(isDocument(node)).toBeFalsy();
  });
});
