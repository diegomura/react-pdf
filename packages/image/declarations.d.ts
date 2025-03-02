declare module 'jay-peg' {
  export function decode(data: Buffer): any;
  export default { decode };
}

declare module '@react-pdf/png-js' {
  class PNG {
    constructor(data: Buffer);
    width: number;
    height: number;
  }

  export default PNG;
}
