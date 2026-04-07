import { loadTaffy } from 'taffy-layout';

let initPromise: Promise<void>;

export const initTaffy = () => {
  return (initPromise ??= loadTaffy().then(() => {}));
};
