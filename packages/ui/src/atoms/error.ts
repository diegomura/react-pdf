import { atom } from 'jotai';

import type { PlaygroundError } from '../types';

import resultAtom from './result';

const toError = (value: unknown): PlaygroundError =>
  value instanceof Error ? value : new Error(String(value));

const errorAtom = atom((get) => {
  const { error } = get(resultAtom);
  return error === null ? null : toError(error);
});

export default errorAtom;
