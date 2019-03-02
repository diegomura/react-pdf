import { getURL } from '../src/utils/url';

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

  test('should support mailto protocol', () => {
    const url = 'mailto:test@example.com';
    expect(getURL(url)).toEqual('mailto:test@example.com');
  });
});
