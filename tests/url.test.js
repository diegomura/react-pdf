import { isURL, getURL } from '../src/utils/url';

describe('isURL', () => {
  test('should return true for valid url', () => {
    const url = 'http://react-pdf.org';
    expect(isURL(url)).toBeTruthy();
  });

  test('should return true for valid url with www', () => {
    const url = 'http://www.react-pdf.org';
    expect(isURL(url)).toBeTruthy();
  });

  test('should return true for remote asset', () => {
    const url = 'http://react-pdf.org/public/image.jpg';
    expect(isURL(url)).toBeTruthy();
  });

  test('should return false for invalid url', () => {
    const url = 'react-pdf.org';
    expect(isURL(url)).toBeFalsy();
  });

  test('should return false for non string argument', () => {
    const url = { src: 'react-pdf.org' };
    expect(isURL(url)).toBeFalsy();
  });

  test('should return false if no argument', () => {
    expect(isURL()).toBeFalsy();
  });
});

describe('getURL', () => {
  test('should add valid protocol if missing', () => {
    const url = 'react-pdf.org';
    expect(getURL(url)).toEqual('http://react-pdf.org');
  });

  test('should return same url if protocol present', () => {
    const url = 'http://react-pdf.org';
    expect(getURL(url)).toEqual('http://react-pdf.org');
  });

  test('should support https protocol', () => {
    const url = 'https://react-pdf.org';
    expect(getURL(url)).toEqual('https://react-pdf.org');
  });
});
