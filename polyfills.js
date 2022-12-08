import { TextEncoder, TextDecoder } from 'util';

const raf = cb => {
  setTimeout(cb, 0);
};

global.requestAnimationFrame = raf;
global.cancelAnimationFrame = raf;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.URL = { createObjectURL: () => 'some_url', revokeObjectURL: () => null };

export default raf;
