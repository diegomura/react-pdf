import {
  GridAutoFlow as TaffyGridAutoFlow,
  type GridPlacement as TaffyGridPlacement,
  type TrackSizingFunction,
  type GridTemplateComponent,
} from 'taffy-layout';

import { SafeNode } from '../types';

/**
 * Parse a single track sizing value into a TrackSizingFunction.
 *
 * Supports: px numbers, percentages, fr units, auto, min-content, max-content
 */
const parseTrackSize = (token: string): TrackSizingFunction => {
  const trimmed = token.trim();

  if (trimmed === 'auto') return { min: 'auto', max: 'auto' };
  if (trimmed === 'min-content')
    return { min: 'min-content', max: 'min-content' };
  if (trimmed === 'max-content')
    return { min: 'max-content', max: 'max-content' };

  if (trimmed.endsWith('fr')) {
    const value = Number(trimmed.slice(0, -2));
    return { min: 'auto', max: `${value}fr` };
  }

  if (trimmed.endsWith('%')) {
    const value = trimmed as `${number}%`;
    return { min: value, max: value };
  }

  const num = Number(trimmed);
  if (!Number.isNaN(num)) return { min: num, max: num };

  return { min: 'auto', max: 'auto' };
};

/**
 * Parse a CSS grid-template-columns/rows string into Taffy track components.
 *
 * Supports: "1fr 2fr 1fr", "100 200 100", "repeat(3, 1fr)", "minmax(100, 1fr)"
 */
const parseGridTemplate = (value: string): GridTemplateComponent[] => {
  const result: GridTemplateComponent[] = [];

  // Handle repeat() syntax
  const repeatRegex = /repeat\(\s*(\d+|auto-fill|auto-fit)\s*,\s*(.+?)\s*\)/g;
  let processed = value;
  let match;

  while ((match = repeatRegex.exec(value)) !== null) {
    const countStr = match[1];
    const tracksStr = match[2];

    const count =
      countStr === 'auto-fill' || countStr === 'auto-fit'
        ? countStr
        : Number(countStr);

    const tracks = tracksStr.split(/\s+/).map(parseTrackSize);

    result.push({ count, tracks });
    processed = processed.replace(match[0], '');
  }

  // Parse remaining tokens
  const remaining = processed.trim();
  if (remaining) {
    // Handle minmax() tokens
    const tokens: string[] = [];
    let depth = 0;
    let current = '';
    for (const char of remaining) {
      if (char === '(') depth++;
      if (char === ')') depth--;
      if (char === ' ' && depth === 0 && current.trim()) {
        tokens.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    if (current.trim()) tokens.push(current.trim());

    for (const token of tokens) {
      const minmaxMatch = token.match(/^minmax\(\s*(.+?)\s*,\s*(.+?)\s*\)$/);
      if (minmaxMatch) {
        const minTrack = parseTrackSize(minmaxMatch[1]);
        const maxTrack = parseTrackSize(minmaxMatch[2]);
        result.push({ min: minTrack.min, max: maxTrack.max });
      } else {
        result.push(parseTrackSize(token));
      }
    }
  }

  return result;
};

/**
 * Parse a CSS grid placement value (grid-column-start, grid-row-end, etc.)
 */
const parseGridPlacement = (value: string | number): TaffyGridPlacement => {
  if (value === 'auto') return 'auto';
  if (typeof value === 'number') return value;

  const str = String(value).trim();

  if (str === 'auto') return 'auto';

  const spanMatch = str.match(/^span\s+(\d+)$/);
  if (spanMatch) return { span: Number(spanMatch[1]) };

  const num = Number(str);
  if (!Number.isNaN(num)) return num;

  return 'auto';
};

/**
 * Parse grid-column or grid-row shorthand: "1 / 3", "1 / span 2", "span 2"
 */
const parseGridLineShorthand = (
  value: string,
): { start: TaffyGridPlacement; end: TaffyGridPlacement } => {
  const parts = value.split('/').map((s) => s.trim());
  if (parts.length === 2) {
    return {
      start: parseGridPlacement(parts[0]),
      end: parseGridPlacement(parts[1]),
    };
  }
  return {
    start: parseGridPlacement(parts[0]),
    end: 'auto',
  };
};

const GRID_AUTO_FLOW_MAP: Record<string, TaffyGridAutoFlow> = {
  row: TaffyGridAutoFlow.Row,
  column: TaffyGridAutoFlow.Column,
  'row dense': TaffyGridAutoFlow.RowDense,
  'column dense': TaffyGridAutoFlow.ColumnDense,
};

// --- Node setters ---

export const setGridTemplateColumns =
  (value?: string | null) => (node: SafeNode) => {
    if (value && node.yogaNode) {
      node.yogaNode.setGridTemplateColumns(parseGridTemplate(value));
    }
    return node;
  };

export const setGridTemplateRows =
  (value?: string | null) => (node: SafeNode) => {
    if (value && node.yogaNode) {
      node.yogaNode.setGridTemplateRows(parseGridTemplate(value));
    }
    return node;
  };

export const setGridAutoColumns =
  (value?: string | null) => (node: SafeNode) => {
    if (value && node.yogaNode) {
      node.yogaNode.setGridAutoColumns(value.split(/\s+/).map(parseTrackSize));
    }
    return node;
  };

export const setGridAutoRows = (value?: string | null) => (node: SafeNode) => {
  if (value && node.yogaNode) {
    node.yogaNode.setGridAutoRows(value.split(/\s+/).map(parseTrackSize));
  }
  return node;
};

export const setGridAutoFlow = (value?: string | null) => (node: SafeNode) => {
  if (value && node.yogaNode) {
    const mapped = GRID_AUTO_FLOW_MAP[value];
    if (mapped != null) node.yogaNode.setGridAutoFlow(mapped);
  }
  return node;
};

export const setGridColumn = (value?: string | null) => (node: SafeNode) => {
  if (value && node.yogaNode) {
    const { start, end } = parseGridLineShorthand(value);
    node.yogaNode.setGridColumnStart(start);
    node.yogaNode.setGridColumnEnd(end);
  }
  return node;
};

export const setGridRow = (value?: string | null) => (node: SafeNode) => {
  if (value && node.yogaNode) {
    const { start, end } = parseGridLineShorthand(value);
    node.yogaNode.setGridRowStart(start);
    node.yogaNode.setGridRowEnd(end);
  }
  return node;
};

export const setGridColumnStart =
  (value?: string | number | null) => (node: SafeNode) => {
    if (value != null && node.yogaNode) {
      node.yogaNode.setGridColumnStart(parseGridPlacement(value));
    }
    return node;
  };

export const setGridColumnEnd =
  (value?: string | number | null) => (node: SafeNode) => {
    if (value != null && node.yogaNode) {
      node.yogaNode.setGridColumnEnd(parseGridPlacement(value));
    }
    return node;
  };

export const setGridRowStart =
  (value?: string | number | null) => (node: SafeNode) => {
    if (value != null && node.yogaNode) {
      node.yogaNode.setGridRowStart(parseGridPlacement(value));
    }
    return node;
  };

export const setGridRowEnd =
  (value?: string | number | null) => (node: SafeNode) => {
    if (value != null && node.yogaNode) {
      node.yogaNode.setGridRowEnd(parseGridPlacement(value));
    }
    return node;
  };
