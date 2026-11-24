declare module 'linebreak' {
  interface Break {
    position: number;
    required: boolean;
  }

  export class LineBreaker {
    constructor(text: string);
    nextBreak(): Break | null;
  }
}
