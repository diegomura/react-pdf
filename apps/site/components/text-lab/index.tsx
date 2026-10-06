'use client';

import dynamic from 'next/dynamic';
import type { FC } from 'react';

import { LabSkeleton } from './ui';

/** fontkit and textkit only load once a reader scrolls into one of these. */
export const GlyphLab = dynamic(
  () => import('./glyph-lab').then((m) => m.GlyphLab),
  { ssr: false, loading: () => <LabSkeleton height="h-40" /> },
) as FC;

export const LineBreakLab = dynamic(
  () => import('./line-break-lab').then((m) => m.LineBreakLab),
  { ssr: false, loading: () => <LabSkeleton height="h-56" /> },
) as FC;

export const LineBoxLab = dynamic(
  () => import('./line-box-lab').then((m) => m.LineBoxLab),
  { ssr: false, loading: () => <LabSkeleton height="h-52" /> },
) as FC;

export { RunsStrip } from './runs-strip';
