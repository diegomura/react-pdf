import { expect, test } from 'vitest';

import { examples } from '../src/repl/examples';
import { groupedExamples } from '../src/repl/example-groups';

test('every example is reachable from exactly one group', () => {
  const listed = groupedExamples.flatMap(({ names }) => names);

  expect(new Set(listed).size).toBe(listed.length);
  expect(listed.sort()).toEqual(Object.keys(examples).sort());
});

test('names land in the group they read like', () => {
  const groupFor = (name: string) =>
    groupedExamples.find(({ names }) => names.includes(name))?.group;

  expect(groupFor('svgtext')).toBe('SVG');
  expect(groupFor('textinput')).toBe('Forms');
  expect(groupFor('text')).toBe('Text & fonts');
  expect(groupFor('page-wrap')).toBe('Layout & pagination');
  expect(groupFor('quick-start')).toBe('Essentials');
});
