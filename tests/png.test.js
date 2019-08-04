import fs from 'fs';
import path from 'path';
import PNG from '../src/utils/png';

const localJPGImage = fs.readFileSync(path.join(__dirname, 'assets/test.jpg'));
const localPNGImage = fs.readFileSync(path.join(__dirname, 'assets/test.png'));
const interlacedLocalPNGImage = fs.readFileSync(
  path.join(__dirname, 'assets/interlaced-test.png'),
);

describe('png', () => {
  test('should return true for valid interlaced PNG images', () => {
    expect(PNG.isValid(interlacedLocalPNGImage)).toBeTruthy();
  });

  test('should return true for valid PNG images', () => {
    expect(PNG.isValid(localPNGImage)).toBeTruthy();
  });

  test('should return false for non PNG images', () => {
    expect(PNG.isValid(localJPGImage)).toBeFalsy();
  });

  test('should return false for empty argument', () => {
    expect(PNG.isValid()).toBeFalsy();
  });

  test('should return false for non buffer argument', () => {
    expect(PNG.isValid('some data')).toBeFalsy();
  });
});
