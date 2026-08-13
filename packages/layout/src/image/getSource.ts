import { SafeImageNode, SafeImageBackgroundNode } from '../types';

type ImageLikeNode = SafeImageNode | SafeImageBackgroundNode;

type SrcSetEntry = {
  uri: string;
  width: number;
};

/**
 * Parses an HTML-compatible srcSet string into structured entries.
 * Only width descriptors (e.g. "300w") are supported.
 */
const parseSrcSet = (srcSet: string): SrcSetEntry[] => {
  return srcSet
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .reduce<SrcSetEntry[]>((acc, entry) => {
      const parts = entry.split(/\s+/);
      const uri = parts[0];
      const descriptor = parts[1];

      if (descriptor && descriptor.endsWith('w')) {
        const width = parseFloat(descriptor);
        if (!Number.isNaN(width)) acc.push({ uri, width });
      }

      return acc;
    }, []);
};

/**
 * Selects the most appropriate image source from a parsed srcSet
 * based on the target display width.
 *
 * Picks the smallest source that is >= targetWidth,
 * or the largest available if none are large enough.
 */
const selectSource = (entries: SrcSetEntry[], targetWidth: number): string => {
  if (entries.length === 0) return '';

  const sorted = [...entries].sort((a, b) => a.width - b.width);

  const match = sorted.find((e) => e.width >= targetWidth);

  return match ? match.uri : sorted[sorted.length - 1].uri;
};

// TODO: Unify with page/getSize.ts parseValue/transformUnit into a shared unit parser
/**
 * Parses a CSS length value into points.
 * Supports: px, pt (default), in, mm, cm, vw, %.
 * vw and % are resolved relative to containerWidth.
 */
const parseLength = (
  value: string,
  containerWidth: number,
): number | undefined => {
  const match = /^(-?\d*\.?\d+)\s*(px|pt|in|mm|cm|vw|%)?$/i.exec(value.trim());

  if (!match) return undefined;

  const num = parseFloat(match[1]);

  if (Number.isNaN(num)) return undefined;

  const unit = match[2]?.toLowerCase();

  switch (unit) {
    case 'in':
      return num * 72;
    case 'mm':
      return num * (72 / 25.4);
    case 'cm':
      return num * (72 / 2.54);
    case 'px':
      return num;
    case 'vw':
      return (num / 100) * containerWidth;
    case '%':
      return (num / 100) * containerWidth;
    case 'pt':
    default:
      return num;
  }
};

/**
 * Evaluates a media condition like "(min-width: 600px)" or "(max-width: 400px)"
 * against the container width.
 */
const matchesCondition = (
  condition: string,
  containerWidth: number,
): boolean => {
  const match =
    /\(\s*(min-width|max-width)\s*:\s*(-?\d*\.?\d+)\s*(px|pt|in|mm|cm|vw|%)?\s*\)/i.exec(
      condition,
    );

  if (!match) return false;

  const feature = match[1].toLowerCase();
  const threshold = parseLength(`${match[2]}${match[3] || ''}`, containerWidth);

  if (threshold == null) return false;

  if (feature === 'min-width') return containerWidth >= threshold;
  if (feature === 'max-width') return containerWidth <= threshold;

  return false;
};

/**
 * Parses sizes attribute to get the target display width.
 *
 * Accepts a number (used directly as points) or a string.
 * For strings, evaluates media conditions against containerWidth
 * and returns the first matching entry's length value.
 *
 * Format: "(media-condition) length, (media-condition) length, default-length"
 */
const parseSizes = (
  sizes: string | number | undefined,
  containerWidth: number,
): number | undefined => {
  if (sizes == null) return undefined;
  if (typeof sizes === 'number') return sizes;

  const entries = sizes.split(',').map((s) => s.trim());

  for (const entry of entries) {
    const conditionMatch = /^\(([^)]+)\)\s+(.+)$/.exec(entry);

    if (conditionMatch) {
      const condition = `(${conditionMatch[1]})`;
      const lengthStr = conditionMatch[2];

      if (matchesCondition(condition, containerWidth)) {
        return parseLength(lengthStr, containerWidth);
      }
    } else {
      return parseLength(entry, containerWidth);
    }
  }

  return undefined;
};

/**
 * Get image source, resolving srcSet if present.
 *
 * @param node - Image node
 * @param pageWidth - Page width for srcSet resolution
 * @returns Image src
 */
const getSource = (node: ImageLikeNode, pageWidth: number) => {
  const { srcSet, sizes } = node.props;

  if (srcSet) {
    const entries = parseSrcSet(srcSet);

    if (entries.length > 0) {
      const targetWidth = parseSizes(sizes, pageWidth) || pageWidth;
      const uri = selectSource(entries, targetWidth);

      if (uri) return uri;
    }
  }

  if (node.props.src) return node.props.src;
  if (node.props.source) return node.props.source;
};

export default getSource;
