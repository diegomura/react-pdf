import isCanvas from '../../src/node/isCanvas';
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

describe('node isCanvas', () => {
  test('Should return false for view', () => {
    const node = { type: VIEW };
    expect(isCanvas(node)).toBeFalsy();
  });

  test('Should return false for text', () => {
    const node = { type: TEXT };
    expect(isCanvas(node)).toBeFalsy();
  });

  test('Should return false for link', () => {
    const node = { type: LINK };
    expect(isCanvas(node)).toBeFalsy();
  });

  test('Should return false for note', () => {
    const node = { type: NOTE };
    expect(isCanvas(node)).toBeFalsy();
  });

  test('Should return false for image', () => {
    const node = { type: IMAGE };
    expect(isCanvas(node)).toBeFalsy();
  });

  test('Should return false for document', () => {
    const node = { type: DOCUMENT };
    expect(isCanvas(node)).toBeFalsy();
  });

  test('Should return false for canvas', () => {
    const node = { type: CANVAS };
    expect(isCanvas(node)).toBeTruthy();
  });

  test('Should return true for page', () => {
    const node = { type: PAGE };
    expect(isCanvas(node)).toBeFalsy();
  });

  test('Should return false for text instance', () => {
    const node = { type: TEXT_INSTANCE };
    expect(isCanvas(node)).toBeFalsy();
  });
});
