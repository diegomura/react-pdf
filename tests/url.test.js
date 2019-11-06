import { getURL, isSrcId, setLink, setDestination } from '../src/utils/url';
import Base from '../src/elements/Base';
import root from './utils/dummyRoot';

describe('getURL', () => {
  test('should return empty string for missing param', () => {
    expect(getURL()).toEqual('');
  });

  test('should return empty string for empty string', () => {
    expect(getURL('')).toEqual('');
  });

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

  test('should support skype protocol', () => {
    const url = 'skype:username';
    expect(getURL(url)).toEqual('skype:username');
  });

  test('should support twitter protocol', () => {
    const url = 'twitter://post?message=Hey';
    expect(getURL(url)).toEqual(url);
  });

  test('should support whatsapp protocol', () => {
    const url = 'whatsapp://send?text=Hey';
    expect(getURL(url)).toEqual(url);
  });

  test('it should return the value if it is a id and not url', () => {
    const src = '#myDest';
    expect(getURL(src)).toBe(src);
  });

  test('isSrcId', () => {
    const validDestSrc = '#myDest';
    expect(isSrcId(validDestSrc)).toBeTruthy();
    const invalidDestSrcs = ['#', 'google.com', 'www.google.com'];
    invalidDestSrcs.forEach(src => expect(isSrcId(src)).toBeFalsy());
  });

  test('setLink when src is valid URL', () => {
    const dummyRoot = root.reset();
    const src = 'https://react-pdf.org';
    const node = new Base(dummyRoot, { src });
    node.src = src;
    node.getAbsoluteLayout = jest
      .fn()
      .mockReturnValue({ left: 20, top: 20, width: 20, height: 20 });
    setLink(node);
    expect(dummyRoot.instance.link).toHaveBeenCalledWith(20, 20, 20, 20, src);
  });

  test('setLink when src is a valid id', () => {
    const dummyRoot = root.reset();
    const src = '#myDest';
    const node = new Base(dummyRoot, { src });
    node.src = src;
    node.getAbsoluteLayout = jest
      .fn()
      .mockReturnValue({ left: 20, top: 20, width: 20, height: 20 });

    setLink(node);

    expect(dummyRoot.instance.goTo).toHaveBeenCalledWith(
      20,
      20,
      20,
      20,
      src.slice(1),
    );
  });

  test('setLink when there is no src', () => {
    const dummyRoot = root.reset();
    const node = new Base(dummyRoot, {});

    setLink(node);

    expect(dummyRoot.instance.goTo).not.toHaveBeenCalled();
  });

  test('setDestination if there is no id prop', () => {
    const dummyRoot = root.reset();
    const node = new Base(dummyRoot, {});

    setDestination(node);

    expect(dummyRoot.instance.addNamedDestination).not.toHaveBeenCalled();
  });

  test('setDestination', () => {
    const dummyRoot = root.reset();
    const id = 'myDest';
    const node = new Base(dummyRoot, { id });
    const top = 20;
    node.getAbsoluteLayout = jest.fn().mockReturnValue({ top });

    setDestination(node);

    expect(dummyRoot.instance.addNamedDestination).toHaveBeenCalledWith(
      id,
      'XYZ',
      null,
      top,
      null,
    );
  });
});
