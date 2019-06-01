import isImage from '../../src/node/isImage';
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

describe('node isImage', () => {
  test('Should return false for view', () => {
    const node = { type: VIEW };
    expect(isImage(node)).toBeFalsy();
  });

  test('Should return false for text', () => {
    const node = { type: TEXT };
    expect(isImage(node)).toBeFalsy();
  });

  test('Should return false for link', () => {
    const node = { type: LINK };
    expect(isImage(node)).toBeFalsy();
  });

  test('Should return false for note', () => {
    const node = { type: NOTE };
    expect(isImage(node)).toBeFalsy();
  });

  test('Should return false for image', () => {
    const node = { type: IMAGE };
    expect(isImage(node)).toBeTruthy();
  });

  test('Should return false for document', () => {
    const node = { type: DOCUMENT };
    expect(isImage(node)).toBeFalsy();
  });

  test('Should return false for canvas', () => {
    const node = { type: CANVAS };
    expect(isImage(node)).toBeFalsy();
  });

  test('Should return true for page', () => {
    const node = { type: PAGE };
    expect(isImage(node)).toBeFalsy();
  });

  test('Should return false for text instance', () => {
    const node = { type: TEXT_INSTANCE };
    expect(isImage(node)).toBeFalsy();
  });
});
