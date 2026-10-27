import { FillResult, StepResult } from './types';

export const CONTINUE = (): StepResult => ({ kind: 'continue' });

export const REWIND = (): StepResult => ({ kind: 'rewind' });

export const DECLINE = (): StepResult => ({ kind: 'decline' });

export const DONE = (result: FillResult): StepResult => ({
  kind: 'done',
  result,
});
