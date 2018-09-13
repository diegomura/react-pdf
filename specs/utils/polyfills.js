const raf = cb => {
  setTimeout(cb, 0);
};

global.requestAnimationFrame = raf;
global.cancelAnimationFrame = raf;
global.URL = { createObjectURL: () => 'some_url' };

export default raf;
