export interface Reconciler<T> {
  createContainer: (container: any) => T;
  updateContainer: (
    element: T,
    container: T,
    parentComponent: T,
    callback?: () => void,
  ) => void;
}

export type ReconcilerFactory = <I, T>(config: {
  appendChild: (parent: I, child: I | T) => void;
  appendChildToContainer: (parent: I, child: I | T) => void;
  commitTextUpdate: (textInstance: T, oldText: string, newText: string) => void;
  commitUpdate: (
    instance: I,
    updatePayload: any,
    type: string,
    oldProps: any,
    newProps: any,
  ) => void;
  createInstance: (type: string, props: any) => I;
  createTextInstance: (text: string) => T;
  insertBefore: (parent: I, child: I | T, beforeChild: I | T) => void;
  removeChild: (parent: I, child: I | T) => void;
  removeChildFromContainer: (parent: I, child: I | T) => void;
  resetAfterCommit: () => void;
}) => Reconciler<I>;
