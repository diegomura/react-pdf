// http://webassemblycode.com/browser-supports-webassembly-degree/
const wasmSupported = scope => {
  let supported = false;

  if (typeof scope.WebAssembly !== 'object') {
    return false;
  }

  // A try section is much more convenient as we don't need to keep adding ifs  
  try {
    /* This is the minimum and useful webassembly module  
        explanation of every bit is here:  
        https://webassemblycode.com/dissecting-minimum-useful-webassembly-module/ */

    const xorBinWasm = new Uint8Array([
      0x00, 0x61, 0x73, 0x6D, 0x01, 0x00, 0x00, 0x00,
      0x01, 0x07, 0x01, 0x60, 0x02, 0x7F, 0x7F, 0x01,
      0x7F, 0x03, 0x02, 0x01, 0x00, 0x07, 0x07, 0x01,
      0x03, 0x58, 0x4F, 0x52, 0x00, 0x00, 0x0A, 0x09,
      0x01, 0x07, 0x00, 0x20, 0x00, 0x20, 0x01, 0x73,
      0x0B
    ]);

    const WebAssemblyInstance = new WebAssembly.Instance(new WebAssembly.Module(xorBinWasm));
    const xorFunc = WebAssemblyInstance.exports.XOR;

    /* Is the webassembly code working?  
        details on dead beef can be found here:  
        https://webassemblycode.com/xor-english-word/ */

    if (
      (xorFunc(0xFF00, 0x21AD) !== 0xdead) ||
      (xorFunc(0xAA55, 0x14BA) !== 0xbeef)
    ) {
      // NO! let the world know about  
      throw false;
    }

    // Everything worked, webassembly is supported  
    supported = true;
  }
  catch (e) {
    supported = false;
  }

  return supported;
};

export default wasmSupported(
  (typeof self === 'object' && self.self === self && self) ||
  (typeof global === 'object' && global.global === global && global) ||
  (typeof window === 'object' && window.window === window && window) ||
  {},
);
