/* eslint-disable import/no-extraneous-dependencies */

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
};

const REPLACE_OPTIONS = {
  useSyncScheduling: { value: true },
  supportsMutation: { value: true },
  isPrimaryRenderer: { value: false },
  warnsIfNotActing: { value: false },
};

const METHOD_KEYS = {
  updateContainer: true,
  createContainer: true,
};

function clearReconcilerOptions(path) {
  const { node } = path;
  const objectName = node.object.name;
  const optionName = node.property.name;

  // If we are not visiting config object, skip.
  if (objectName !== '$$$hostConfig') {
    this.traverse(path);
    return;
  }

  // If it's an option we want to keep, skip.
  if (KEEP_OPTIONS[optionName]) {
    this.traverse(path);
    return;
  }

  // If it's an option we want to replace, replace it.
  if (REPLACE_OPTIONS[optionName]) {
    const newValue = REPLACE_OPTIONS[optionName].value;
    path.replace(newValue ? trueLiteral : falseLiteral);
    this.traverse(path);
    return;
  }

  // Remove option.
  path.replace(nullLiteral);
  this.traverse(path);
}

function clearReconcilerMethods(path) {
  const { node } = path;

  // Hacky: vg here comes from minified package
  if (node.id.name === 'vg') {
    const newProperties = node.init.properties.filter(
      (property) => METHOD_KEYS[property.key.name],
    );

    path.get('init', 'properties').replace(newProperties);
  }

  this.traverse(path);
}

const trimReconciler = () => {
  return {
    name: 'trim-reconciler',

    transform(code) {
      const ast = recast.parse(code);

      visit(ast, {
        visitMemberExpression: clearReconcilerOptions,
        visitVariableDeclarator: clearReconcilerMethods,
      });

      return { code: recast.print(ast).code };
    },
  };
};

export default trimReconciler;
