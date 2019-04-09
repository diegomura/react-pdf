import fs from 'fs';
import path from 'path';
import GIF from '../src/utils/gif';

const localGIFImage = fs.readFileSync(path.join(__dirname, 'assets/test.gif'));
const localPNGImage = fs.readFileSync(path.join(__dirname, 'assets/test.png'));

describe('gif', () => {
  test('should return true for valid gif images', () => {
    expect(GIF.isValid(localGIFImage)).toBeTruthy();
  });

  test('should return false for non gif images', () => {
    expect(GIF.isValid(localPNGImage)).toBeFalsy();
  });

  test('should return false for empty argument', () => {
    expect(GIF.isValid()).toBeFalsy();
  });

  test('should return false for non buffer argument', () => {
    expect(GIF.isValid('some data')).toBeFalsy();
  });
});
