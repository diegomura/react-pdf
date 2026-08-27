'use client';

import { useEffect, useState } from 'react';
import * as fontkit from 'fontkit';

export const ROBOTO = '/fonts/Roboto-Regular.ttf';

export type Glyph = {
  id: number;
  codePoints: number[];
  advanceWidth: number;
  path: { toSVG: () => string };
};

export type Position = {
  xAdvance: number;
  yAdvance: number;
  xOffset: number;
  yOffset: number;
};

export type GlyphRun = {
  glyphs: Glyph[];
  positions: Position[];
  advanceWidth: number;
};

export type Font = {
  unitsPerEm: number;
  ascent: number;
  descent: number;
  lineGap: number;
  layout: (
    string: string,
    features?: Record<string, boolean> | string[],
  ) => GlyphRun;
};

const pending = new Map<string, Promise<Font>>();

const load = (src: string) => {
  let request = pending.get(src);

  if (!request) {
    request = fetch(src)
      .then((response) => response.arrayBuffer())
      .then((buffer) => fontkit.create(new Uint8Array(buffer)) as Font);
    pending.set(src, request);
  }

  return request;
};

export const useFont = (src: string = ROBOTO) => {
  const [font, setFont] = useState<Font | null>(null);

  useEffect(() => {
    let live = true;
    load(src).then((loaded) => {
      if (live) setFont(loaded);
    });
    return () => {
      live = false;
    };
  }, [src]);

  return font;
};

export const isSpace = (glyph: Glyph) => glyph.codePoints.includes(0x20);

/** Natural line height, the value textkit uses when no lineHeight is set. */
export const naturalHeight = (font: Font, fontSize: number) =>
  ((font.lineGap + font.ascent - font.descent) / font.unitsPerEm) * fontSize;
