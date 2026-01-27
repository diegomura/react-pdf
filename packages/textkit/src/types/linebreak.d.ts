declare module 'linebreak' {
  interface Break {
    position: number;
    required: boolean;
  }

  class LineBreaker {
    constructor(text: string);
    nextBreak(): Break | null;
  }

  export = LineBreaker;
}
