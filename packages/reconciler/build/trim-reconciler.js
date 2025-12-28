import * as recast from 'recast';
import { visit } from 'ast-types';

const trueLiteral = recast.types.builders.literal(true);
const falseLiteral = recast.types.builders.literal(false);
const nullLiteral = recast.types.builders.literal(null);

const KEEP_OPTIONS = {
  commitUpdate: true,
  commitTextUpdate: true,
  removeChildFromContainer: true,
  removeChild: true,
  insertBefore: true,
  appendChildToContainer: true,
  appendChild: true,
  shouldSetTextContent: true,
  getChildHostContext: true,
  getRootHostContext: true,
  resetTextContent: true,
  resetAfterCommit: true,
  prepareUpdate: true,
  clearContainer: true,
  prepareForCommit: true,
  getPublicInstance: true,
  finalizeInitialChildren: true,
  createTextInstance: true,
  createInstance: true,
  appendInitialChild: true,
  noTimeout: true,
  getCurrentUpdatePriority: true,
  setCurrentUpdatePriority: true,
  resolveUpdatePriority: true,
  shouldAttemptEagerTransition: true,
  requestPostPaintCallback: true,
  maySuspendCommit: true,
  detachDeletedInstance: true,
  resolveEventTimeStamp: true,
  resolveEventType: true,
  trackSchedulerEvent: true,
};

const STATIC_OPTIONS = {
  useSyncScheduling: { value: true },
  supportsMutation: { value: true },
  isPrimaryRenderer: { value: false },
  warnsIfNotActing: { value: false },
};

const METHOD_KEYS = {
  updateContainer: true,
  updateContainerSync: true,
  createContainer: true,
  flushSyncWork: true,
};

function clearReconcilerOptions(path) {
  const { node } = path;
  const objectName = node.object?.name;
  const optionName = node.property?.name;

  // If we are not visiting config object, skip.
  if (objectName !== '$$$hostConfig' && objectName !== '$$$config') return;

  // If it's an option we want to keep, skip.
  if (KEEP_OPTIONS[optionName]) return;

  // If it's an option we want to replace, replace it.
  if (STATIC_OPTIONS[optionName]) {
    const newValue = STATIC_OPTIONS[optionName].value;
    path.replace(newValue ? trueLiteral : falseLiteral);
    return;
  }

  // Remove option.
  path.replace(nullLiteral);
}

function clearReconcilerMethods(path) {
  const { node } = path;
  const objectName = node.object?.name;
  const optionName = node.property?.name;

  // If we are not visiting an exported method, skip.
  if (objectName !== 'exports') return;

  // If it's a method we want to keep, skip.
  if (METHOD_KEYS[optionName]) return;

  // Remove method.
  path.parent.replace(nullLiteral);
}

const trimReconciler = () => {
  return {
    name: 'trim-reconciler',

    transform(code) {
      const ast = recast.parse(code);

      visit(ast, {
        visitMemberExpression(path) {
          clearReconcilerOptions(path);
          clearReconcilerMethods(path);
          this.traverse(path);
        },
      });

      return { code: recast.print(ast).code };
    },
  };
};

export default trimReconciler;
