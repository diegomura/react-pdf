declare global {
  namespace JSX {
    interface IntrinsicElements {
      DOCUMENT: any;
      PAGE: any;
      TEXT: any;
      VIEW: any;
    }
  }

  interface Navigator {
    readonly msSaveBlob: any;
  }

  const BROWSER: boolean;

  interface Window {
    BROWSER: boolean;
  }

  namespace jest {
    interface Matchers<R> {
      toMatchImageSnapshot(): R;
    }
  }
}

export {};
