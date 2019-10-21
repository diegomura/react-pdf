import isSvg from '../../src/node/isSvg';
import {
  VIEW,
  TEXT,
  LINK,
  PAGE,
  NOTE,
  IMAGE,
  SVG,
  DOCUMENT,
  CANVAS,
  TEXT_INSTANCE,
} from '../../src/constants';

describe('node isSvg', () => {
  test('Should return false for view', () => {
    const node = { type: VIEW };
    expect(isSvg(node)).toBeFalsy();
  });

  test('Should return false for text', () => {
    const node = { type: TEXT };
    expect(isSvg(node)).toBeFalsy();
  });

  test('Should return false for link', () => {
    const node = { type: LINK };
    expect(isSvg(node)).toBeFalsy();
  });

  test('Should return false for note', () => {
    const node = { type: NOTE };
    expect(isSvg(node)).toBeFalsy();
  });

  test('Should return false for image', () => {
    const node = { type: IMAGE };
    expect(isSvg(node)).toBeFalsy();
  });

  test('Should return false for document', () => {
    const node = { type: DOCUMENT };
    expect(isSvg(node)).toBeFalsy();
  });

  test('Should return false for canvas', () => {
    const node = { type: CANVAS };
    expect(isSvg(node)).toBeFalsy();
  });

  test('Should return false for page', () => {
    const node = { type: PAGE };
    expect(isSvg(node)).toBeFalsy();
  });

  test('Should return true for SVG', () => {
    const node = { type: SVG };
    expect(isSvg(node)).toBeTruthy();
  });

  test('Should return false for text instance', () => {
    const node = { type: TEXT_INSTANCE };
    expect(isSvg(node)).toBeFalsy();
  });
});
