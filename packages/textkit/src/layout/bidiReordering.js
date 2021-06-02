import * as R from 'ramda'
import bidiFactory from 'bidi-js';

import stringLength from '../attributedString/length'

const bidi = bidiFactory();

const getBidiLevels = runs => {
  return runs.reduce((acc, run) => {
    const length = run.end - run.start
    const levels = R.repeat(run.attributes.bidiLevel, length)
    return acc.concat(levels)
  }, [])
}

const getReorderedIndices = (string, segments) => {
  // Fill an array with indices
  const indices = []
  for (let i = 0; i < string.length; i += 1) {
    indices[i] = i
  }
  // Reverse each segment in order
  segments.forEach(([start, end]) => {
    const slice = indices.slice(start, end + 1)
    for (let i = slice.length; i--;) {
      indices[end - i] = slice[i]
    }
  })
  return indices
}

const reorderLine = attributedString => {
  const levels = getBidiLevels(attributedString.runs)
  const direction = attributedString.runs[0]?.attributes.direction;
  const level =  direction === 'rtl' ? 1 : 0
  const end = stringLength(attributedString) - 1
  const paragraphs = [{ start: 0, end, level }]
  const embeddingLevels = { paragraphs, levels }

  const segments = bidi.getReorderSegments(
    attributedString.string,
    embeddingLevels,
  );

  // No need for bidi reordering
  if (segments.length === 0) return attributedString

  const indices = getReorderedIndices(
    attributedString.string,
    segments,
  );

  console.log(attributedString, segments);

  return attributedString
}

const reorderParagraph = R.map(reorderLine)

const bidiReordering = () => R.map(reorderParagraph)

export default bidiReordering;
