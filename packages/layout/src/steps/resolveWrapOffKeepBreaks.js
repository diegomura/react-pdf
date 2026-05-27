import * as P from '@surge-global-engineering/rpdf-primitives';

import getWrapArea from '../page/getWrapArea';
import getContentArea from '../page/getContentArea';
import { resolvePageDimensions } from './resolveDimensions';
import resolveInheritance from './resolveInheritance';
import resolveTextLayout from './resolveTextLayout';
import getNodesHeight from '../node/getNodesHeight';
import { canDrawOnPage, getPresenceAhead } from '../node/shouldBreak';

// Temporary id on each keepWithNextWrappedBlock.
const KEEP_STARTER_ID = 'wrapOffKeepStarterId';
// TO identify if needs to apply break before this or not.
const KEEP_BREAK = 'wrapOffKeepBreak';
// Marks the first node of an unwrapped image in the wrap-off test layout.
const WRAPPED_IMAGE_NODE_ID = 'wrapOffWrappedImageNodeId';
const WRAP_OFF_KEEP_VICINITY_CAP = 140;

const relayoutPage = (page, fontStore) =>
  resolveTextLayout(
    resolveInheritance(resolvePageDimensions(page, fontStore)),
    fontStore,
  );

const flattenChildren = children =>
  children.reduce((acc, child) => {
    if (Array.isArray(child)) {
      acc.push(...flattenChildren(child));
    } else if (child) {
      acc.push(child);
    }

    return acc;
  }, []);

// Tag the first node of an wrapped-image block with an id.
const markWrappedImageStart = (nodes, imageNodeId) =>
  nodes.map((node, index) =>
    index === 0
      ? {
          ...node,
          props: node.props
            ? { ...node.props, [WRAPPED_IMAGE_NODE_ID]: imageNodeId }
            : { [WRAPPED_IMAGE_NODE_ID]: imageNodeId },
        }
      : node,
  );

// Clones a node as if wrap were off so that we can later determine if it can be kept with the next wrapped block
const cloneNodeForWrapOffLayout = (node, imageRef) => {
  if (!node) return null;

  const nextImageRef = imageRef || { current: 0 };

  if (node.props?.fillPreviousWrapTextSpacing) {
    return [];
  }

  if (node.props?.hasWrapTextAroundComponent) {
    const queue = [node];

    while (queue.length) {
      const current = queue.pop();

      if (current.props?.wrapTextAround) {
        const wrappedImageNodes = flattenChildren(
          (current.children || []).map(child =>
            cloneNodeForWrapOffLayout(child, nextImageRef),
          ),
        );
        const wrappedImageNodeId = nextImageRef.current;
        nextImageRef.current += 1;

        return wrappedImageNodes.length
          ? markWrappedImageStart( wrappedImageNodes, wrappedImageNodeId)
          : wrappedImageNodes;
      }

      (current.children || []).forEach(child => queue.push(child));
    }

    return [];
  }

  if (node.props?.wrapTextAround) {
    return flattenChildren(
      (node.children || []).map(child =>
        cloneNodeForWrapOffLayout(child, nextImageRef),
      ),
    );
  }

  const nextProps = node.props ? { ...node.props } : {};
  delete nextProps.keepWithNextWrappedBlock;
  delete nextProps[KEEP_BREAK];

  return {
    ...node,
    props: nextProps,
    box: {},
    lines: null,
    children: flattenChildren(
      (node.children || []).map(child =>
        cloneNodeForWrapOffLayout(child, nextImageRef),
      ),
    ),
  };
};

// Assign KEEP_STARTER_ID to each keepWithNextWrappedBlock node.
const assignKeepStarterIds = (node, keepStarterIdRef) => {
  if (!node) {
    return node;
  }

  const nextKeepStarterIdRef = keepStarterIdRef || { current: 0 };

  return {
    ...node,
    props: node.props?.keepWithNextWrappedBlock
      ? (() => {
          const keepStarterId = nextKeepStarterIdRef.current;
          nextKeepStarterIdRef.current += 1;
          return { ...node.props, [KEEP_STARTER_ID]: keepStarterId };
        })()
      : node.props,
    children: (node.children || []).map(child =>
      assignKeepStarterIds(child, nextKeepStarterIdRef),
    ),
  };
};

const findFirstWrappedImageTop = (node, parentTop = 0) => {
  if (!node) {
    return null;
  }

  const nodeTop = parentTop + (node.box?.top || 0);

  if (node.props?.[WRAPPED_IMAGE_NODE_ID] !== undefined) {
    return nodeTop;
  }

  const wrappedImageTop = (node.children || []).reduce((result, child) => {
    if (result !== null) {
      return result;
    }

    return findFirstWrappedImageTop(child, nodeTop);
  }, null);

  return wrappedImageTop;
};

// Find how far ahead the next nearby wrapped image is.
const getBundleEndIndex = (child, futureElements) => {
  const childBottom = (child.box?.top || 0) + (child.box?.height || 0);

  for (let index = 0; index < futureElements.length; index += 1) {
    const wrappedImageTop = findFirstWrappedImageTop(futureElements[index]);

    if (wrappedImageTop !== null) {
      if (wrappedImageTop - childBottom <= WRAP_OFF_KEEP_VICINITY_CAP) {
        return index;
      }

      return null;
    }
  }

  return null;
};

// Rebase child box.top values so they are relative to the bundle container.
const normalizeBundleChildren = (children, offset) =>
  children.map(child => ({
    ...child,
    box: child.box
      ? { ...child.box, top: (child.box.top || 0) - offset }
      : child.box,
  }));

const createBundleNode = children => {
  if (!children.length) {
    return null;
  }

  const bundleTop = children[0].box?.top || 0;

  return {
    type: P.View,
    props: {},
    style: {},
    box: {
      top: bundleTop,
      height: getNodesHeight(children),
    },
    children: normalizeBundleChildren(children, bundleTop),
  };
};

// Collect break decisions for each keepWithNextWrappedBlock node.
const collectBreakDecisionsInChildren = (
  children,
  height,
  contentArea,
  decisions,
) => {
  const nextChildren = children || [];

  for (let index = 0; index < nextChildren.length; index += 1) {
    const child = nextChildren[index];
    const futureElements = nextChildren.slice(index + 1);
    const keepStarterId = child.props?.[KEEP_STARTER_ID];

    if (keepStarterId !== undefined) {
      const bundleEndIndex = getBundleEndIndex(child, futureElements);

      if (bundleEndIndex === null) {
        decisions.set(keepStarterId, false);
      } else {
        const bundleNode = createBundleNode(
          futureElements.slice(0, bundleEndIndex + 1),
        );
        const remainingFutureElements = futureElements.slice(bundleEndIndex + 1);
        const presenceAhead = getPresenceAhead(remainingFutureElements, height);

        decisions.set(
          keepStarterId,
          !!bundleNode &&
            canDrawOnPage(bundleNode, presenceAhead, height, contentArea),
        );
      }
    }

    if (child.children?.length) {
      const nextHeight = height - (child.box?.top || 0);
      collectBreakDecisionsInChildren(
        child.children,
        nextHeight,
        contentArea,
        decisions,
      );
    }
  }

  return decisions;
};

const collectBreakDecisions = page =>
  collectBreakDecisionsInChildren(
    page.children || [],
    getWrapArea(page),
    getContentArea(page),
    new Map(),
  );

const hasKeepWithNextWrappedBlock = node => {
  if (!node) {
    return false;
  }

  if (node.props?.keepWithNextWrappedBlock) {
    return true;
  }

  return (node.children || []).some(hasKeepWithNextWrappedBlock);
};

// Writes the decision map back onto the real tree as wrapOffKeepBreak.
const applyBreakDecisions = (node, decisions) => {
  if (!node) {
    return node;
  }

  const keepStarterId = node.props?.[KEEP_STARTER_ID];
  const hasKeepStarterId = keepStarterId !== undefined;

  return {
    ...node,
    props: node.props?.keepWithNextWrappedBlock
      ? {
          ...node.props,
          [KEEP_BREAK]: hasKeepStarterId ? decisions.get(keepStarterId) || false : false,
        }
      : node.props,
    children: (node.children || []).map(child =>
      applyBreakDecisions(child, decisions),
    ),
  };
};

const removeTempWrapOffKeepProps = node => {
  if (!node) {
    return node;
  }

  const nextProps = node.props ? { ...node.props } : node.props;

  if (nextProps) {
    delete nextProps[KEEP_STARTER_ID];
    delete nextProps[WRAPPED_IMAGE_NODE_ID];
  }

  return {
    ...node,
    props: nextProps,
    children: (node.children || []).map(removeTempWrapOffKeepProps),
  };
};

const sanitizeNodeTree = node => {
  if (!node) {
    return null;
  }

  const nextChildren = (node.children || [])
    .map(sanitizeNodeTree)
    .filter(Boolean);

  return {
    ...node,
    props: node.props && typeof node.props === 'object' && !Array.isArray(node.props) ? node.props : {},
    style: node.style && typeof node.style === 'object' && !Array.isArray(node.style) ? node.style: {},
    box: node.box && typeof node.box === 'object' && !Array.isArray(node.box) ? node.box : {},
    children: nextChildren,
  };
};

// Run a wrap-off layout test to determine if each keepWithNextWrappedBlock can be kept with the next wrapped image.
const resolveWrapOffKeepBreaks = (page, fontStore) => {
  const shouldRunWrapOffKeep = hasKeepWithNextWrappedBlock(page);

  if (!shouldRunWrapOffKeep) {
    return page;
  }

  const pageWithStarterIds = assignKeepStarterIds(page);
  const wrapOffPage = cloneNodeForWrapOffLayout(pageWithStarterIds);
  const wrapOffLayoutPage = relayoutPage(wrapOffPage, fontStore);

  return sanitizeNodeTree(
    removeTempWrapOffKeepProps(
      applyBreakDecisions(pageWithStarterIds, collectBreakDecisions(wrapOffLayoutPage)),
    ),
  );
};

export default resolveWrapOffKeepBreaks;
