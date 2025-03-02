declare module 'abs-svg-path';

declare module 'color-string' {
  function get(hex: string): { model: string; value: number[] } | null;

  function toHex(color: number[]): string;

  export default {
    get,
    to: { hex: toHex },
  };
}

declare module 'normalize-svg-path' {
  export default function normalizePath(path: any[]): any[];
}

declare module 'parse-svg-path' {
  export default function parsePath(path: string): any[];
}
