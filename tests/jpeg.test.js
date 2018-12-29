import fs from 'fs';
import path from 'path';
import JPEG from '../src/utils/jpeg';

const localJPGImage = fs.readFileSync(path.join(__dirname, 'assets/test.jpg'));
const localPNGImage = fs.readFileSync(path.join(__dirname, 'assets/test.png'));

describe('jpeg', () => {
  test('should return true for valid jpeg images', () => {
    expect(JPEG.isValid(localJPGImage)).toBeTruthy();
  });

  test('should return false for non jpeg images', () => {
    expect(JPEG.isValid(localPNGImage)).toBeFalsy();
  });

  test('should return false for empty argument', () => {
    expect(JPEG.isValid()).toBeFalsy();
  });

  test('should return false for non buffer argument', () => {
    expect(JPEG.isValid('some data')).toBeFalsy();
  });
});
