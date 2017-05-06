// Traverse tree strucure in a depth-first order
const traverseTree = (node, enter) => {
  function traverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  }

  function traverseNode(node, parent) {
    if (enter) {
      enter(node, parent);
    }

    if (Array.isArray(node.children)) {
      traverseArray(node.children, node);
    } else {
      traverseNode(node.children, node);
    }
  }

  traverseNode(node, null);
};

export default traverseTree;
